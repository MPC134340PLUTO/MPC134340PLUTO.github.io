# 原始作者与授权

## 正式筛选采用的来源

| 来源 | 作者或署名 | 发布年 | 许可 | 使用范围 |
| --- | --- | --- | --- | --- |
| [Sideview Sci-Fi - Patreon Collection](https://opengameart.org/content/sideview-sci-fi-patreon-collection) | ansimuz | 2019 | CC0 1.0 | 舱室壁板、服务器与终端、桌面机器人、轨道星港桁架。 |
| [Space Background](https://opengameart.org/content/space-background-3) | ansimuz | 2015 | CC0 1.0 | 窗景的独立星雾、行星、卫星和星点。 |
| [Space Backgrounds & Planets](https://opengameart.org/content/space-backgrounds-planets) | dog-eared | 2019 | CC0 1.0 | 三种雾色纹理与赤色行星。作者原页说明使用 GIMP 创作。 |
| [Space BG & Planets](https://opengameart.org/content/space-bg-planets) | Carriejanesart | 2018 | CC0 1.0 | 蔚蓝近轨、冰蓝星境中的大尺度天体。 |
| [Space Parallax Background](https://opengameart.org/content/space-parallax-background) | scorcher24 | 2012 | CC0 1.0 | 蔚蓝近轨、恒星黎明、静默深空的星点及暗底。 |
| [2D space background](https://opengameart.org/content/2d-space-background) | Scribe | 2013 | CC0 1.0 | 恒星黎明的恒星地平线艺术素材。 |
| [Spaceship Tiles](https://opengameart.org/content/spaceship-tiles) | NettySvit | 2021 | CC BY 4.0 | 轨道星港的玻璃舱模块。裁切亮边、缩放、调暗后与桁架等其他素材合成。 |

CC0 原件可用于裁切、修改、公开使用与 重新打包。NettySvit 的原件与派生 WIN-10 若分发，应保留作者、作品链接、CC BY 4.0 链接和改动说明。本次选择作品页公布的 CC BY 4.0 路径。公开站、原件包和单图分发均应一并保留署名。

[CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

## 本轮制图与来源确认

用于合成的网络发布原件有 2012—2021 年的作者记录及明确授权。来源库中 2022 年后发布或方式不清的素材只进入候选检索记录。以明确坐标绘制、CSS/SVG 和局部光照计算生成的项目新制文件按「程序绘制」登记。阶段 A 包没有使用图像生成模型产生的像素图，也没有把来源待确认的候选记为人工原创。

窗景为游戏场景中的艺术表现。V0.1 截图仅供站主验收比较。

## V0.2 原型复核

原作者页面均可访问。阶段 A 原始包中的九个文件已与发布页实际附件逐字节比较，均一致。逐文件 URL、发布年和 SHA-256 见 `SOURCE_RECHECK.csv`。作者原件长期发布记录和文件匹配支持本轮非生成图判断，未获得每位作者对创作流程的单独声明。原型新增的布艺细节、墙面图案、灯光及全息效果沿用所在项目的代码绘制方式。

## Astro Integration RC1

复用以上 V0.2 已验收素材，未新增插图。原型 Base64 字节与独立运行文件逐项一致。本次仅将 95 个使用中的图像、缩略图及图标纳入运行路径。定位蒙版、固定装饰单件原图、备用图标和外部原始附件不属于运行资产。底板复用 Ansimuz 的 CC0 壁板、服务器柜和电脑终端精灵，配合项目代码绘制的场景结构、家具和开孔。前景、局部光照、全息辉光和固定装饰合成均由项目程序绘制。

迁移时保留了公开页面已有的旧舷窗链接与资产路径。在同一份清单中，`SOURCE_RECHECK.csv` 对应第三方原始附件，`ASSET_MANIFEST.csv` 对应采用的素材内容，`RUNTIME_FILES.csv` 对应实际发布文件及派生缩略图。公开浏览时可在个人舱下方查看 NettySvit 署名。

## V0.2.1 精修候选

未调用图像生成工具。沿用阶段 A 原附件：Ansimuz CC0 `sci-fi-interior-paltform/PNG/background.png` 两个仪表裁片及 `spaceship-unit.png` 第一帧（缩放、降饱和度）；NettySvit CC BY 4.0 `mv_mz_spaceship.png` 两个裁片（缩放、调暗、组合）用于 WIN-10，原 RC2 WIN-12 星场作底。沙发、支架、书册、箱体、通风及太阳能翼由像素坐标程序绘制。CC BY 4.0 作者、链接和改动说明保留在组件及清单内。原始附件沿用先前交付，本轮未重新从网络下载。

## V0.2.1 原件补充（用户上传）

Luis Zuno @ansimuz，Sideview Sci-Fi - Patreon Collection，2019 年归档；包内 public-license.txt 声明 public domain，允许个人及商业使用。完整许可文本见 Ansimuz_Sideview_License.txt。上传 ZIP SHA-256: 6df6feb73a194568ca0505ea5787867c8dbe623cdebe6a4c555288f1d92b0ccf。

- `tile-set-sci-fi-interior-platform.png`：格栅、检修模块裁切、降饱和度、缩放，合成入 Fixed_Dressing_Layout。
- `sci-fi-interior-paltform/PNG/background.png`：原始设备面板裁片。
- `cyberpunk-corridor-foreground.png`：线缆裁切、调色与缩放。
- `another-world-tileset.png`：植物裁片，调色后合成到 DSK-03 生态植物舱。

保留原有作者及许可记录，不使用生成式图像工具。
