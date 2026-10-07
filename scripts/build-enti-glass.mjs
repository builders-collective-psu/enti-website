import fs from 'node:fs';
import { Shape, Path, ExtrudeGeometry } from 'three';

// Replace only the hero meshes; retain all other scene assets and runtime names.
const source = fs.readFileSync('public/common/scene.glb');
const jsonLength = source.readUInt32LE(12);
const scene = JSON.parse(source.subarray(20, 20 + jsonLength).toString());
const binStart = 20 + jsonLength + 8;
let binary = Buffer.from(source.subarray(binStart, binStart + source.readUInt32LE(20 + jsonLength)));

const head = new Shape();
head.moveTo(76, 153); head.lineTo(76, 131); head.lineTo(57, 131);
head.bezierCurveTo(39, 131, 26, 119, 26, 101); head.lineTo(26, 83);
head.bezierCurveTo(26, 49, 52, 24, 86, 24); head.lineTo(115, 24);
head.lineTo(129, 39); head.bezierCurveTo(136, 46, 133, 56, 124, 59);
head.lineTo(112, 59); head.lineTo(112, 153); head.closePath();
// A real opening through the glass, rather than a painted transparent panel.
const window = new Path();
window.moveTo(58, 113); window.lineTo(98, 113); window.lineTo(98, 47);
window.lineTo(85, 47); window.bezierCurveTo(62, 47, 44, 64, 44, 85);
window.lineTo(44, 99); window.bezierCurveTo(44, 108, 49, 113, 58, 113);
head.holes.push(window);

const shapes = [head];
for (const [x, y] of [[108, 67], [123, 88], [108, 109], [126, 130]]) {
  const node = new Shape(); node.absarc(x, y, 8, 0, Math.PI * 2, false); shapes.push(node);
  if (y === 130) continue; // Dot 4 keeps the box outline, without an extra top bar.
  const bar = new Shape();
  bar.moveTo(73, y - 2); bar.lineTo(x, y - 2); bar.lineTo(x, y + 2);
  bar.lineTo(73, y + 2); bar.closePath(); shapes.push(bar);
}
const geometry = new ExtrudeGeometry(shapes, {
  depth: 28, bevelEnabled: true, bevelSegments: 4, steps: 1,
  bevelSize: 2.2, bevelThickness: 2.2, curveSegments: 48,
});
// Match the original hero's local bounds, orientation and thickness.
geometry.translate(-82, -88.5, -14);
geometry.scale(.0029, -.0029, .0033);
// The Y reflection reverses winding. Correct it for the glass renderer.
for (const attribute of Object.values(geometry.attributes)) {
  for (let i = 0; i < attribute.count; i += 3) {
    for (let k = 0; k < attribute.itemSize; k++) {
      const a = (i + 1) * attribute.itemSize + k;
      const b = (i + 2) * attribute.itemSize + k;
      [attribute.array[a], attribute.array[b]] = [attribute.array[b], attribute.array[a]];
    }
  }
}
geometry.computeVertexNormals(); geometry.computeBoundingBox();

function accessor(array, type, target, bounds) {
  const padding = (4 - binary.length % 4) % 4;
  binary = Buffer.concat([binary, Buffer.alloc(padding)]);
  const offset = binary.length;
  const bytes = Buffer.from(array.buffer, array.byteOffset, array.byteLength);
  binary = Buffer.concat([binary, bytes]);
  const view = scene.bufferViews.push({ buffer: 0, byteOffset: offset, byteLength: bytes.length, target }) - 1;
  const size = { SCALAR: 1, VEC2: 2, VEC3: 3 }[type];
  return scene.accessors.push({ bufferView: view, componentType: array instanceof Uint32Array ? 5125 : 5126,
    count: array.length / size, type, ...bounds }) - 1;
}
const box = geometry.boundingBox;
const attributes = {
  POSITION: accessor(geometry.attributes.position.array, 'VEC3', 34962, { min: box.min.toArray(), max: box.max.toArray() }),
  NORMAL: accessor(geometry.attributes.normal.array, 'VEC3', 34962),
  TEXCOORD_0: accessor(geometry.attributes.uv.array, 'VEC2', 34962),
};
const indices = accessor(Uint32Array.from({ length: geometry.attributes.position.count }, (_, i) => i), 'SCALAR', 34963);
for (const name of ['Eship_A', 'Eship_Outline', 'Eship_SideScreen']) {
  const node = scene.nodes.find(node => node.name === name);
  const mesh = scene.meshes[node.mesh];
  const material = mesh.primitives[0].material;
  mesh.primitives = [{ attributes, indices, ...(material === undefined ? {} : { material }) }];
}
scene.buffers[0].byteLength = binary.length;
const json = Buffer.from(JSON.stringify(scene));
const jsonPad = Buffer.concat([json, Buffer.alloc((4 - json.length % 4) % 4, 32)]);
const binPad = Buffer.concat([binary, Buffer.alloc((4 - binary.length % 4) % 4)]);
const header = Buffer.alloc(12); header.writeUInt32LE(0x46546c67); header.writeUInt32LE(2, 4);
header.writeUInt32LE(12 + 8 + jsonPad.length + 8 + binPad.length, 8);
const jsonHeader = Buffer.alloc(8); jsonHeader.writeUInt32LE(jsonPad.length); jsonHeader.writeUInt32LE(0x4e4f534a, 4);
const binHeader = Buffer.alloc(8); binHeader.writeUInt32LE(binPad.length); binHeader.writeUInt32LE(0x004e4942, 4);
fs.writeFileSync('public/common/scene-enti.glb', Buffer.concat([header, jsonHeader, jsonPad, binHeader, binPad]));
console.log('Built ENTI glass hero with an open central window.');
