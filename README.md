# PlanetServer Touch Client

## Setup

The current Touch Prototype of PlanetServer can be deployed using any HTTP web server. The application is single-page based with the main file being `index.html`. All scripts, stylesheets and similar files are in the `static/` directory and are included through the `index.html` file. There is at the moment no build file using `grunt` or similar. For deployment using nginx you can have a look at the configuration file in `utils/planetserver.conf`.

## Todo

- [ ] Add additional functionality
- [ ] Transform files into a modular structure (factor out common parts between the different clients)
- [ ] Move external vendor files to dendency management system like [Bower](http://bower.io)
- [ ] Add build script to optimize client for deployment similar to the approach in the Neo client

## Contributors
Dominik Kundel - [dominik.kundel@gmail.com](mailto:dominik.kundel@gmail.com)
