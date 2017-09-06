const packager = require('electron-packager'),
      fs = require('fs'),
      archiver = require('archiver'),
      path = require('path');

var options = {
  dir: './',
  arch: 'ia32, x64',
  asar: true,
  icon: 'images/appicon',
  name: 'Glyphr Studio',
  out: 'build',
  platform: 'linux, win32, darwin',
  appBundleId: 'glyphr-studio-desktop',
  win32metadata: {
    FileDescription: 'Glyphr Studio Desktop',
    CompanyName: 'Glyphr Studio'
  }
};

process.argv.forEach(function(arg) {
  switch (arg) {
    case '-mac':
      options.platform = 'darwin';
      options.arch = 'x64';
      break;
    case '-win':
      options.platform = 'win32';
      options.arch = 'x64';
      break;
    case '-win32':
      options.platform = 'win32';
      options.arch = 'ia32';
      break;
    case '-linux':
      options.platform = 'linux';
      options.arch = 'x64';
      break;
    case '-linux32':
      options.platform = 'linux';
      options.arch = 'ia32';
      break;
    case '-64':
      options.platform = 'linux, win32, darwin';
      options.arch = 'x64';
      break;
  };
});

packager(options)
  .then((appPaths) => {
    appPaths.forEach(function(buildDir) {
      let buildName = buildDir.split(path.sep)[1],
          output = fs.createWriteStream(`build/${buildName}.zip`),
          archive = archiver('zip', {
            zlib: { level: 9 }
          });

      console.log(`Packing ${buildName} into a zip...`);

      output.on('close', function() {
        console.log(`Successfully zipped ${buildName}`);
      });

      archive.on('warning', function(err) {
        if (err) {
          console.warn(err);
        }
      });

      archive.on('error', function(err) {
        throw err;
      });

      archive.pipe(output);
      archive.directory(buildDir, false);
      archive.finalize();
    });
  });
