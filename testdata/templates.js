const Template = require('./../src/models/template');

module.exports = () => {
    return Promise.all(
        [
            {
                title: 'Image',
                template: `<div class = "">
                           <div class="template-image"><img src="./cloud.png"></div>                          
                           </div>`
            },
            {
                title: 'Text',
                template: `<div class = "card">
                           <div class="template-title">Why? Function declarations are hoisted, which means that it’s easy - too easy - to reference the function before it is defined in the file. This harms readability and maintainability.</div>
                           </div>`
            },
            {
                title: 'Image text',
                template: `<div class = "card">
                           <div class="template-image"><img src="./cloud.png"></div>
                           <div class="template-title">Why? Function declarations are hoisted, which means that it’s easy - too easy - to reference the function before it is defined in the file. This harms readability and maintainability.</div>
                           </div>`
            },
            {
                title: 'Images',
                template: `<div class = "grid">                         
                               <div class="template-image"><img src="./cloud.png"></div>
                               <div class="template-image"><img src="./cloud.png"></div>
                               <div class="template-image"><img src="./cloud.png"></div>                         
                               <div class="template-image"><img src="./cloud.png"></div>
                               <div class="template-image"><img src="./cloud.png"></div>
                               <div class="template-image"><img src="./cloud.png"></div>
                               <div class="template-image"><img src="./cloud.png"></div>
                               <div class="template-image"><img src="./cloud.png"></div>
                               <div class="template-image"><img src="./cloud.png"></div>
                           </div>`
            }
        ].map(template => {
            return new Promise((resolve, reject) => {
                return Template.create(template).then(resolve).catch(reject);
            });

        })
    );
}