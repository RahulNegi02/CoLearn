const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT = __dirname;
const PORT = 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif':  'image/gif',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.ico':  'image/x-icon',
  '.mp4':  'video/mp4',
  '.webm': 'video/webm',
};

// Compressible types
const COMPRESS = new Set(['text/html; charset=utf-8', 'text/css', 'application/javascript', 'application/json', 'image/svg+xml']);

// Cache durations
const CACHE_DURATION = {
  '.html': 0,
  '.css':  31536000, // 1 year (hashed)
  '.js':   31536000, // 1 year (hashed)
  '.woff2':31536000,
  '.svg':  86400,
  '.png':  86400,
  '.jpg':  86400,
  '.jpeg': 86400,
  '.webp': 86400,
  '.mp4':  86400,
};

const server = http.createServer((req, res) => {
  let urlPath;
  try {
    urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    res.writeHead(400); res.end('Invalid URL'); return;
  }
  if (urlPath.startsWith('/Dam/Dam Simulation/')) {
    urlPath = urlPath.replace('/Dam/Dam Simulation/', '/Dam/Dam-Simulation/');
  }
  if (urlPath.startsWith('/Solar/Solar Panel/')) {
    urlPath = urlPath.replace('/Solar/Solar Panel/', '/Solar/Solar-Panel/');
  }
  if (urlPath.startsWith('/Wind Power/Wind Power/')) {
    urlPath = urlPath.replace('/Wind Power/Wind Power/', '/Wind-Power/Wind-Power/');
  }
  if (urlPath.startsWith('/Wind Power/')) {
    urlPath = urlPath.replace('/Wind Power/', '/Wind-Power/');
  }
  if (urlPath.endsWith('/')) urlPath += 'index.html';

  const filePath = path.resolve(ROOT, `.${urlPath}`);
  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME[ext] || 'application/octet-stream';
  const cacheSecs = CACHE_DURATION[ext] || 0;

  // Security: don't serve outside ROOT
  if (filePath !== ROOT && !filePath.startsWith(`${ROOT}${path.sep}`)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      // Try index.html
      const indexPath = path.join(ROOT, urlPath, 'index.html');
      fs.stat(indexPath, (e2, s2) => {
        if (e2 || !s2.isFile()) {
          res.writeHead(404); res.end('Not found'); return;
        }
        serveFile(indexPath, 'text/html; charset=utf-8', 0, req, res);
      });
      return;
    }
    serveFile(filePath, mime, cacheSecs, req, res);
  });
});

function serveFile(filePath, mime, cacheSecs, req, res) {
  const ext = path.extname(filePath).toLowerCase();
  const headers = {
    'Content-Type': mime,
    'X-Content-Type-Options': 'nosniff',
  };

  if (cacheSecs > 0) {
    headers['Cache-Control'] = `public, max-age=${cacheSecs}, immutable`;
  } else {
    headers['Cache-Control'] = 'no-cache';
  }

  // Support HTTP Range requests for video streaming (eliminates lag completely)
  const range = req.headers.range;
  if (range && (ext === '.mp4' || ext === '.webm')) {
    try {
      const stat = fs.statSync(filePath);
      const total = stat.size;
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : Math.min(start + 1024 * 1024 - 1, total - 1);
      const chunksize = (end - start) + 1;

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${total}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': mime,
        'Cache-Control': 'public, max-age=86400',
      });
      fs.createReadStream(filePath, { start, end }).pipe(res);
      return;
    } catch (e) {
      res.writeHead(500); res.end('Streaming error'); return;
    }
  }

  const acceptEncoding = req.headers['accept-encoding'] || '';
  const canCompress = COMPRESS.has(mime);

  if (canCompress && acceptEncoding.includes('br')) {
    headers['Content-Encoding'] = 'br';
    headers['Vary'] = 'Accept-Encoding';
    res.writeHead(200, headers);
    fs.createReadStream(filePath).pipe(zlib.createBrotliCompress()).pipe(res);
  } else if (canCompress && acceptEncoding.includes('gzip')) {
    headers['Content-Encoding'] = 'gzip';
    headers['Vary'] = 'Accept-Encoding';
    res.writeHead(200, headers);
    fs.createReadStream(filePath).pipe(zlib.createGzip({ level: 6 })).pipe(res);
  } else {
    headers['Accept-Ranges'] = 'bytes';
    res.writeHead(200, headers);
    fs.createReadStream(filePath).pipe(res);
  }
}

server.listen(PORT, () => {
  console.log(`\n  Server running at http://localhost:${PORT}/`);
  console.log(`  Serving: ${ROOT}`);
  console.log(`  Brotli + Gzip compression enabled`);
  console.log(`  Press Ctrl+C to stop\n`);
});
