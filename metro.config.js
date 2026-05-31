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

// Add wasm asset support
config.resolver.assetExts.push('wasm');
 
// Add COEP and COOP headers to support SharedArrayBuffer
config.server.enhanceMiddleware = (middleware) => {
  return (req, res, next) => {
    res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    middleware(req, res, next);
  };
};


module.exports = config;