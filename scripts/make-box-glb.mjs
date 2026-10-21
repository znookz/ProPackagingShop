// Generates simple placeholder box models (.glb) until real product models are supplied.
// Usage: npm run make:models
import { writeFileSync, mkdirSync } from 'node:fs';

const OUT = 'public/models';

/** Box centred on the origin, 24 vertices (flat shading), CCW winding seen from outside. */
function boxGeometry(w, h, d) {
  const x = w / 2, y = h / 2, z = d / 2;
  const faces = [
    { n: [0, 0, 1], v: [[-x, -y, z], [x, -y, z], [x, y, z], [-x, y, z]] },
    { n: [0, 0, -1], v: [[x, -y, -z], [-x, -y, -z], [-x, y, -z], [x, y, -z]] },
    { n: [1, 0, 0], v: [[x, -y, z], [x, -y, -z], [x, y, -z], [x, y, z]] },
    { n: [-1, 0, 0], v: [[-x, -y, -z], [-x, -y, z], [-x, y, z], [-x, y, -z]] },
    { n: [0, 1, 0], v: [[-x, y, z], [x, y, z], [x, y, -z], [-x, y, -z]] },
    { n: [0, -1, 0], v: [[-x, -y, -z], [x, -y, -z], [x, -y, z], [-x, -y, z]] },
  ];
  const positions = [], normals = [], indices = [];
  faces.forEach((f, i) => {
    f.v.forEach((p) => { positions.push(...p); normals.push(...f.n); });
    const o = i * 4;
    indices.push(o, o + 1, o + 2, o, o + 2, o + 3);
  });
  return { positions, normals, indices, min: [-x, -y, -z], max: [x, y, z] };
}

function makeGlb({ w, h, d, color, name }) {
  const g = boxGeometry(w, h, d);
  const pos = Buffer.from(new Float32Array(g.positions).buffer);
  const nor = Buffer.from(new Float32Array(g.normals).buffer);
  const idx = Buffer.from(new Uint16Array(g.indices).buffer);
  const bin = Buffer.concat([pos, nor, idx]); // 288 + 288 + 72 bytes, all 4-byte aligned

  const json = {
    asset: { version: '2.0', generator: 'foldwork make-box-glb' },
    scene: 0,
    scenes: [{ nodes: [0] }],
    nodes: [{ mesh: 0, name }],
    meshes: [{ name, primitives: [{ attributes: { POSITION: 0, NORMAL: 1 }, indices: 2, material: 0 }] }],
    materials: [{
      name: 'cardboard',
      pbrMetallicRoughness: { baseColorFactor: [...color, 1], metallicFactor: 0, roughnessFactor: 0.85 },
    }],
    accessors: [
      { bufferView: 0, componentType: 5126, count: 24, type: 'VEC3', min: g.min, max: g.max },
      { bufferView: 1, componentType: 5126, count: 24, type: 'VEC3' },
      { bufferView: 2, componentType: 5123, count: 36, type: 'SCALAR' },
    ],
    bufferViews: [
      { buffer: 0, byteOffset: 0, byteLength: pos.length, target: 34962 },
      { buffer: 0, byteOffset: pos.length, byteLength: nor.length, target: 34962 },
      { buffer: 0, byteOffset: pos.length + nor.length, byteLength: idx.length, target: 34963 },
    ],
    buffers: [{ byteLength: bin.length }],
  };

  let jsonBuf = Buffer.from(JSON.stringify(json), 'utf8');
  jsonBuf = Buffer.concat([jsonBuf, Buffer.alloc((4 - (jsonBuf.length % 4)) % 4, 0x20)]);
  const total = 12 + 8 + jsonBuf.length + 8 + bin.length;
  const header = Buffer.alloc(12);
  header.writeUInt32LE(0x46546c67, 0); // "glTF"
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(total, 8);
  const jh = Buffer.alloc(8);
  jh.writeUInt32LE(jsonBuf.length, 0);
  jh.writeUInt32LE(0x4e4f534a, 4); // "JSON"
  const bh = Buffer.alloc(8);
  bh.writeUInt32LE(bin.length, 0);
  bh.writeUInt32LE(0x004e4942, 4); // "BIN\0"
  return Buffer.concat([header, jh, jsonBuf, bh, bin]);
}

// sizes in metres (model-viewer frames the model automatically)
const models = [
  { file: 'box-tuck.glb', name: 'tuck-box', w: 0.1, h: 0.14, d: 0.06, color: [0.42, 0.48, 0.58] },
  { file: 'box-rigid.glb', name: 'rigid-box', w: 0.14, h: 0.07, d: 0.14, color: [0.3, 0.42, 0.58] },
  { file: 'box-shipper.glb', name: 'shipper-box', w: 0.2, h: 0.12, d: 0.15, color: [0.55, 0.42, 0.28] },
  { file: 'box-handle.glb', name: 'handle-box', w: 0.12, h: 0.16, d: 0.08, color: [0.55, 0.56, 0.6] },
];

mkdirSync(OUT, { recursive: true });
for (const m of models) {
  const glb = makeGlb(m);
  writeFileSync(`${OUT}/${m.file}`, glb);
  console.log(`${OUT}/${m.file}  ${glb.length} bytes`);
}
