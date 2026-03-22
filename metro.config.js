const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Adiciona as extensões de arquivos 3D que o Viro usa
config.resolver.assetExts.push(
  'obj',
  'mtl',
  'JPG',
  'vrx',
  'hdr',
  'gltf',
  'glb',
  'bin',
  'arobject'
);

module.exports = config;