import { groups, categories, icons, box, fixed, presets, defaults, assetRoot } from '../data/cabin-v02.js';

const storageKey = 'mpc.cabin.v2';
const recoveryKey = 'mpc.cabin.v2.recovery';

export function mountCabin(root) {
  const width = 480;
  const height = 270;
  const el = (id) => root.querySelector('#cabin-v02-' + id);
  const canvas = el('scene');
  const context = canvas.getContext('2d');
  const scratch = document.createElement('canvas');
  scratch.width = width;
  scratch.height = height;
  const painter = scratch.getContext('2d');
  const imageCache = new Map();
  const alphaCache = new WeakMap();
  const ui = {
    tabs: el('tabs'), items: el('items'), editor: el('editor'), visit: el('visit'),
    alert: el('action-status'), dialog: el('leave-dialog'),
  };

  let mode = 'visit';
  let category = categories[0];
  let recoveryRaw = null;
  let saved = load();
  let draft = { ...saved };
  let renderVersion = 0;

  function warning(text) {
    el('storage-warning').textContent = text;
    el('storage-warning').hidden = !text;
  }

  function option(key, id) {
    return groups[key].options.find((entry) => entry.id === id);
  }

  function load() {
    let raw;
    try {
      raw = localStorage.getItem(storageKey);
    } catch {
      warning('浏览器限制本地存档。仍可布置和预览。');
      return { ...defaults };
    }
    if (!raw) return { ...defaults };
    try {
      const value = JSON.parse(raw);
      if (!value || value.schemaVersion !== 2) throw Error('schema');
      let recovered = false;
      const next = { ...defaults };
      for (const key of categories) {
        if (option(key, value[key])) next[key] = value[key];
        else recovered = true;
      }
      next.radiant = value.radiant === true;
      if (recovered) {
        recoveryRaw = raw;
        warning('部分存档选项已恢复默认值。');
      }
      return next;
    } catch {
      recoveryRaw = raw;
      warning('存档无法读取，已加载默认布置。');
      return { ...defaults };
    }
  }

  function same(a, b) {
    return a.radiant === b.radiant && categories.every((key) => a[key] === b[key]);
  }
  function dirty() {
    return !same(saved, draft);
  }
  function current() {
    return mode === 'edit' ? draft : saved;
  }

  function bitmap(path) {
    if (imageCache.has(path)) return imageCache.get(path);
    const pending = new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error(path));
      image.src = path;
    });
    imageCache.set(path, pending);
    pending.catch(() => imageCache.delete(path));
    return pending;
  }

  function file(key, id) {
    const ext = key === 'windowScene' ? 'webp' : 'png';
    return assetRoot + groups[key].path + '/' + id + '.' + ext;
  }

  function alphaBounds(image) {
    if (alphaCache.has(image)) return alphaCache.get(image);
    const surface = document.createElement('canvas');
    surface.width = image.naturalWidth;
    surface.height = image.naturalHeight;
    const pen = surface.getContext('2d');
    pen.drawImage(image, 0, 0);
    let bounds = [0, 0, surface.width, surface.height];
    try {
      const { data } = pen.getImageData(0, 0, surface.width, surface.height);
      let minX = surface.width, minY = surface.height, maxX = 0, maxY = 0;
      for (let y = 0; y < surface.height; y++) {
        for (let x = 0; x < surface.width; x++) {
          if (!data[(y * surface.width + x) * 4 + 3]) continue;
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
      }
      if (minX <= maxX) bounds = [minX, minY, maxX - minX + 1, maxY - minY + 1];
    } catch {
      // Use the whole sprite if its pixel data is unavailable.
    }
    alphaCache.set(image, bounds);
    return bounds;
  }

  function cover(image, [left, top, right, bottom]) {
    const targetWidth = right - left;
    const targetHeight = bottom - top;
    const scale = Math.max(targetWidth / image.naturalWidth, targetHeight / image.naturalHeight);
    const sourceWidth = targetWidth / scale;
    const sourceHeight = targetHeight / scale;
    painter.drawImage(image, (image.naturalWidth - sourceWidth) / 2, (image.naturalHeight - sourceHeight) / 2,
      sourceWidth, sourceHeight, left, top, targetWidth, targetHeight);
  }

  function prop(image, key, hologram) {
    if (!image) return;
    const [left, top, right, bottom] = box[key];
    const [sx, sy, sw, sh] = alphaBounds(image);
    const scale = Math.min(1, (right - left) / sw, (bottom - top) / sh);
    const w = Math.max(1, Math.round(sw * scale));
    const h = Math.max(1, Math.round(sh * scale));
    const x = Math.round((left + right - w) / 2);
    const y = key === 'wallDecor' ? Math.round((top + bottom - h) / 2) : bottom - h;
    painter.drawImage(image, sx, sy, sw, sh, x, y, w, h);

    if (hologram) {
      painter.save();
      painter.globalCompositeOperation = 'screen';
      for (let row = y + 2; row < bottom - 2; row += 4) {
        painter.fillStyle = row % 8 === (y + 2) % 8 ? '#59f0f381' : '#ba9df965';
        const inset = row < y + 8 ? 4 : 0;
        painter.fillRect(x + inset, row, Math.max(1, w - 2 * inset), 1);
      }
      painter.restore();
    }
  }

  async function draw(value) {
    const version = ++renderVersion;
    try {
      const [base, frames, front, objects, trim, sky, illumination, model, desk, wall, glow] =
        await Promise.all([
          bitmap(fixed.base), bitmap(fixed.windows), bitmap(fixed.front), bitmap(fixed.objects), bitmap(fixed.trim),
          bitmap(file('windowScene', value.windowScene)), bitmap(file('lighting', value.lighting)),
          ...['displayItem', 'deskItem', 'wallDecor'].map((key) => value[key] ? bitmap(file(key, value[key])) : null),
          value.radiant ? bitmap(fixed.radiant) : null,
        ]);
      if (version !== renderVersion) return;
      painter.globalCompositeOperation = 'source-over';
      painter.imageSmoothingEnabled = false;
      painter.fillStyle = '#0a1728';
      painter.fillRect(0, 0, width, height);
      // Clip sky explicitly to the rectangular opening; the frame and foreground are drawn later.
      painter.save();
      const [wl, wt, wr, wb] = box.windowScene;
      painter.beginPath(); painter.rect(wl, wt, wr - wl, wb - wt); painter.clip();
      cover(sky, box.windowScene);
      painter.restore();
      painter.drawImage(base, 0, 0, width, height);
      prop(model, 'displayItem', value.radiant);
      prop(desk, 'deskItem', false);
      prop(wall, 'wallDecor', false);
      for (const layer of [objects, trim, frames, front, illumination, glow]) {
        if (layer) painter.drawImage(layer, 0, 0, width, height);
      }
      context.drawImage(scratch, 0, 0);
      el('scene-loading').hidden = true;
      for (const key of categories) canvas.dataset[key] = value[key] || '';
      canvas.dataset.radiant = String(value.radiant);
      canvas.setAttribute('aria-label', categories.map((key) => option(key, value[key]).name).join('，') +
        (value.radiant ? '，设备辉光与全息展柜' : ''));
    } catch {
      if (version !== renderVersion) return;
      const message = '有图层加载失败，请检查附件是否完整。';
      if (el('scene-loading').hidden) warning(message);
      else el('scene-loading').textContent = message;
      status(message);
    }
  }

  function node(name, text, className) {
    const result = document.createElement(name);
    if (text) result.textContent = text;
    if (className) result.className = className;
    return result;
  }

  function status(message = '') {
    ui.alert.textContent = message;
  }

  function summary(target, value) {
    target.replaceChildren(...categories.map((key) => {
      const slot = node('div');
      slot.append(node('dt', groups[key].label), node('dd', option(key, value[key]).name));
      return slot;
    }));
  }

  function image(src, alt = '') {
    const pic = node('img');
    pic.src = src;
    pic.alt = alt;
    pic.decoding = 'async';
    return pic;
  }

  function redrawDetails(value) {
    summary(el('summary'), value);
    if (mode === 'visit') {
      summary(el('visit-info'), value);
      const item = option('displayItem', value.displayItem);
      const detail = node('div');
      detail.append(node('strong', item.name),
        node('p', value.radiant && value.displayItem ? '展柜已切换为全息投影。' : item.detail));
      const feature = el('feature');
      feature.replaceChildren();
      if (value.displayItem) feature.append(image(assetRoot + 'thumbnails/' + value.displayItem + '.webp'));
      feature.append(detail);
      const preset = presets.find(({ value: candidate }) => same(candidate, value));
      el('visit-preset').textContent = preset?.name || (value.radiant ? '自定义舱室 · 辉光开启' : '自定义舱室');
    }
    el('scene-window').textContent = option('windowScene', value.windowScene).name;
    el('scene-light').textContent = option('lighting', value.lighting).name;
  }

  function syncSelections() {
    for (const entry of ui.items.children) {
      entry.setAttribute('aria-pressed', String((entry.dataset.itemId || null) === draft[category]));
    }
    el('fx').checked = draft.radiant;
    el('draft-state').textContent = dirty() ? '预览 · 未保存' : '与存档一致';
    const zone = el('zone');
    // The window is behind the telescope; do not draw a DOM rectangle over foreground furniture.
    zone.hidden = mode !== 'edit' || !box[category] || category === 'windowScene';
    root.dataset.editCategory = mode === 'edit' ? category : '';
    if (!zone.hidden) {
      const [left, top, right, bottom] = box[category];
      Object.assign(zone.style, {
        left: (left / width * 100) + '%',
        top: (top / height * 100) + '%',
        width: ((right - left) / width * 100) + '%',
        height: ((bottom - top) / height * 100) + '%',
      });
    }
    const value = current();
    redrawDetails(value);
    draw(value);
  }

  function selectCategory(key) {
    category = key;
    for (const tab of ui.tabs.children) tab.setAttribute('aria-pressed', String(tab.dataset.key === key));
    const choices = groups[key].options;
    el('picker-title').textContent = groups[key].label + '选择';
    el('picker-count').textContent = choices.filter(({ id }) => id).length + ' 项';
    ui.items.replaceChildren(...choices.map((choice) => {
      const item = node('button', '', 'item');
      item.type = 'button';
      item.dataset.itemId = choice.id || '';
      item.dataset.kind = key;
      if (choice.detail) item.title = choice.detail;
      item.append(choice.id ? image(assetRoot + 'thumbnails/' + choice.id + '.webp') :
        node('span', '＋', 'empty'), node('b', choice.name));
      item.addEventListener('click', () => {
        draft[key] = choice.id;
        status('预览 ' + choice.name);
        syncSelections();
      });
      return item;
    }));
    ui.items.scrollTop = 0;
    syncSelections();
  }

  function changeMode(next) {
    mode = next;
    root.dataset.mode = next;
    el('visit-mode').setAttribute('aria-pressed', String(next === 'visit'));
    el('edit-mode').setAttribute('aria-pressed', String(next === 'edit'));
    el('hotspots').hidden = next === 'edit';
    ui.editor.hidden = next !== 'edit';
    ui.visit.hidden = next !== 'visit';
    el('scene-mode').textContent = next === 'edit' ? '实时预览' : '参观模式';
    if (next === 'edit') {
      if (!ui.tabs.childElementCount) setupCategories();
      draft = { ...saved };
      status('');
      selectCategory(category);
    } else {
      syncSelections();
    }
  }

  function leave() {
    if (mode === 'visit') return;
    if (dirty()) ui.dialog.showModal();
    else changeMode('visit');
  }

  function save() {
    try {
      if (recoveryRaw && !localStorage.getItem(recoveryKey)) {
        localStorage.setItem(recoveryKey, recoveryRaw);
      }
      localStorage.setItem(storageKey, JSON.stringify({
        ...draft,
        updatedAt: new Date().toISOString(),
      }));
      saved = { ...draft };
      recoveryRaw = null;
      warning('');
      status('已保存');
      syncSelections();
      return true;
    } catch {
      warning('浏览器限制写入，布置仍是预览状态。');
      status('保存失败');
      return false;
    }
  }

  function setupCategories() {
    categories.forEach((key, index) => {
      const button = node('button');
      button.type = 'button';
      button.dataset.key = key;
      button.append(image(assetRoot + 'ui/' + icons[index] + '.svg'), document.createTextNode(groups[key].label));
      button.addEventListener('click', () => selectCategory(key));
      ui.tabs.append(button);
    });
    ui.tabs.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const index = categories.indexOf(category);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? categories.length - 1 :
        (index + (event.key === 'ArrowRight' ? 1 : -1) + categories.length) % categories.length;
      selectCategory(categories[next]);
      ui.tabs.children[next].focus();
    });
  }

  for (const preset of presets) {
    const button = node('button', preset.name);
    button.type = 'button';
    button.dataset.preset = preset.id;
    button.addEventListener('click', () => {
      draft = { ...preset.value };
      status('预览 ' + preset.name);
      syncSelections();
    });
    el('presets').append(button);
  }

  el('fx').addEventListener('change', (event) => {
    draft.radiant = event.target.checked;
    status(draft.radiant ? '全息辉光已开启' : '全息辉光已关闭');
    syncSelections();
  });
  el('visit-mode').addEventListener('click', leave);
  el('edit-mode').addEventListener('click', () => {
    if (mode === 'visit') changeMode('edit');
  });
  el('visit-edit').addEventListener('click', () => {
    changeMode('edit');
    el('edit-mode').focus();
  });
  el('save').addEventListener('click', save);
  el('cancel').addEventListener('click', () => {
    draft = { ...saved };
    status('已恢复上次保存');
    syncSelections();
  });
  el('reset').addEventListener('click', () => {
    draft = { ...defaults };
    status('默认布置待保存');
    syncSelections();
  });
  el('random').addEventListener('click', () => {
    const next = { ...draft };
    for (const key of categories) {
      const choices = groups[key].options;
      next[key] = choices[Math.floor(Math.random() * choices.length)].id;
    }
    if (same(next, draft)) {
      const windows = groups.windowScene.options;
      const at = windows.findIndex(({ id }) => id === next.windowScene);
      next.windowScene = windows[(at + 1) % windows.length].id;
    }
    draft = next;
    status('随机布置待保存');
    syncSelections();
  });
  el('keep-editing').addEventListener('click', () => ui.dialog.close());
  el('discard-exit').addEventListener('click', () => {
    ui.dialog.close();
    changeMode('visit');
  });
  el('save-exit').addEventListener('click', () => {
    const done = save();
    ui.dialog.close();
    if (done) changeMode('visit');
  });

  const header = document.querySelector('.site-header');
  if (header) {
    const measureHeader = () => root.style.setProperty('--cabin-nav-height', header.getBoundingClientRect().height + 'px');
    new ResizeObserver(measureHeader).observe(header);
    measureHeader();
  }
  root.querySelector('.mode-group').hidden = false;
  el('visit-edit').hidden = false;
  changeMode('visit');
}
