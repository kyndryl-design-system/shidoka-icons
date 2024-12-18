const fs = require('fs');

function run() {
  const sizes = [48, 64, 96];
  const defaultPrimaryColor = '#3D3C3C';
  const defaultSecondaryColor = '#FF462D';
  const primaryToken = '--kd-color-icon-duotone-primary';
  const secondaryToken = '--kd-color-icon-duotone-secondary';

  // get all duotone icon svg files
  sizes.forEach((size) => {
    const directory = `./dist/svg/duotone/${size}`;

    fs.readdir(`${directory}`, (err, files) => {
      if (err) {
        return console.log(err);
      }

      // loop all svg files
      files.forEach((filename) => {
        // get file contents
        fs.readFile(
          `${directory}/${filename}`,
          { encoding: 'utf-8' },
          function (err, data) {
            if (err) {
              return console.log(err);
            }

            let newContents = data;

            // replace primary fill color with variable
            newContents = newContents
              .split(`fill="${defaultPrimaryColor}"`)
              .join(`fill="var(${primaryToken}, ${defaultPrimaryColor})"`);

            // replace secondary fill color with variable
            newContents = newContents
              .split(`fill="${defaultSecondaryColor}"`)
              .join(`fill="var(${secondaryToken}, ${defaultSecondaryColor})"`);

            // write new file
            fs.writeFile(
              `${directory}/${filename}`,
              newContents,
              function (err) {
                if (err) {
                  return console.log(err);
                }
              }
            );
          }
        );
      });
    });
  });
}

run();
