const Template = require('./../src/models/template');

module.exports = () => {
    return Promise.all(
        [
            {
                title: 'Image above text',
                code: `<div class = "grid card">
                           <div class="t-image full-width row-start-1 row-end-12 "></div>                          
                           <div class="t-title full-width row-start-12 row-end-13 "></div>
                        </div>`
            },
            {
                title: 'Text above image',
                code: `<div class = "grid card">
                           <div class="t-title full-width row-start-1 row-end-2 "></div>
                           <div class="t-image full-width row-start-2 row-end-13 "></div>                          
                        </div>`
            },
            {
                title: 'Image at left, text at right',
                code: `<div class = "grid card">
                           <div class="t-image col-start-1 col-end-6"></div>                          
                           <div class="t-title col-start-6 col-end-13"></div>
                        </div>`
            }
        ].map(template => {
            return new Promise((resolve, reject) => {
                return Template.create(template).then(resolve).catch(reject);
            });

        })
    );
}