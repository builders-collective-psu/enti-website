# Alche runtime observation

Captured from the open reference tab at `https://alche.studio/` and compared with `/alche`.

## Initial load

- Black immersive viewport with a fixed WebGL canvas.
- The loading/sound gate appears over the page: `このサイトにはサウンドが含まれます。有効にしますか?`.
- Two actions are exposed: `サウンドをオンにする` and `サウンドなしで進む`.
- Behind the gate, the top scene is already active: a reflective purple triangular form, large white `ALCHE` lettering, curved grid room, news panel, and Tweakpane controls.
- Fixed navigation is visible: ALCHE logo, News, Works, About, stellla, Contact / Recruit, and the sound toggle.

## Top scene

- The WebGL scene fills the viewport and stays fixed while the document sections move underneath it.
- The scene has a dark black/blue/purple palette, perspective grid, reflective glass geometry, animated shader noise, and the large ALCHE material logo.
- The right side exposes the current news items.
- The lower-left and upper-right Tweakpane controls are part of the visible reference experience.

## Section model

The page exposes these section labels in order:

`kv` → `works_intro` → `works` → `works_outro` → `mission_in` → `mission` → `vision` → `vision_out` → `service_in` → `service` → `stellla`.

Navigation and scroll change the active section while the WebGL scene remains mounted. The local mirror currently reaches the DOM and gradient/grid sections, but its main 3D logo scene is the missing behavior to finish.

## Reference vs local gap

- Reference: top of `/` starts on `kv` with the reflective purple ALCHE logo scene.
- Local: `/alche` loads the mirrored DOM and styles, but the viewport can settle on the `vision` content at scroll position 0 and does not show the reflective 3D logo scene consistently.
- Reference uses the original canvas initialization after the sound/loading sequence; forcing the loader away early produces the wrong state.
- All observed page links and section content are present locally under `/alche-mirror/*`.

## Runtime assets confirmed

- `common/scene.glb`
- `envmap/*`
- `common/loading/*`
- `sounds/bgm.mp3`, `sounds/mission_in.mp3`, `sounds/typing.mp3`, `sounds/works_in.mp3`
- `_astro` runtime modules, including the Swup plugins
- referenced `/cms-media/*` images
