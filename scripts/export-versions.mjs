import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

// Historical builds stay independent of the current source and dependencies.
const versions = { v1: 'c50fd02', v2: '9ae4995', v3: '431efc0', v4: 'd21cf74' };
for (const [version, commit] of Object.entries(versions)) {
  const prefix = `/versions/${version}`;
  const files = execFileSync('git', ['ls-tree', '-r', '--name-only', commit, 'dist'], { encoding: 'utf8' }).trim().split('\n');
  for (const file of files) {
    const target = path.join('public', prefix.slice(1), file.slice(5));
    let contents = execFileSync('git', ['show', `${commit}:${file}`], { maxBuffer: 30 * 1024 * 1024 });
    if (/\.(html|js|css)$/.test(file)) {
      let source = contents.toString('utf8');
      if (file.endsWith('.html')) {
        source = source.replace(/((?:href|src)=["'])\/(?!\/)/g, `$1${prefix}/`);
        source = source.replace('<head>', `<head><meta name="review-version" content="${version}">`);
      } else {
        source = source.replace(/(["'`])\/(assets|images)\//g, `$1${prefix}/$2/`);
      }
      if (version === 'v4' && file.endsWith('.js')) {
        // The saved V4 bundle uses BrowserRouter; mount its routes below its snapshot.
        const router = /function (\w+)\(\{basename:(\w+),children:/;
        if (!router.test(source)) throw new Error('V4 BrowserRouter signature changed');
        source = source.replace(router, `function $1({basename:$2="${prefix}",children:`);
      }
      contents = Buffer.from(source);
    }
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, contents);
  }
  console.log(`${version}: exported ${files.length} files from ${commit}`);
}
