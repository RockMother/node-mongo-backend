const Template = require('./../src/models/template');

module.exports = () => {
    return Promise.all(
        [
            {
                title: 'Image left. Text right',
                template: `<div class = "row">
                           <div class="template-image"><img src="./cloud.png"></div>
                           <div class="template-title">Why? Function declarations are hoisted, which means that it’s easy - too easy - to reference the function before it is defined in the file.</div>
                           </div>`
            },
            {
                title: 'A lot of text',
                template: `<div class = "row">
                           <div class="template-title">Why? Function declarations are hoisted, which means that it’s easy - too easy - to reference the function before it is defined in the file. This harms readability and maintainability. If you find that a function’s definition is large or complex enough that it is interfering with understanding the rest of the file, then perhaps it’s time to extract it to its own module! Don’t forget to explicitly name the expression, regardless of whether or not the name is inferred from the containing variable (which is often the case in modern browsers or when using compilers such as Babel). This eliminates any assumptions made about the Error's call stack.</div>
                           </div>`
            },
            {
                title: 'Image',
                template: `<div class = "row">
                           <div class="template-image"><img src="./cloud.png"></div>
                           </div>`
            },
            {
                title: 'Image right. Text left',
                template: `<div class = "row">
                           <div class="template-title">Why? Function declarations are hoisted, which means that it’s easy - too easy - to reference the function before it is defined in the file.</div>
                           <div class="template-image"><img src="./god.png"></div>
                           </div>`
            },
            {
                title: 'Image above Text',
                template: `<div class = "column">
                           <div class="template-image"><img src="./wall.png"></div>
                           <div class="template-title">Why? Function declarations are hoisted, which means that it’s easy - too easy - to reference the function before it is defined in the file.</div>
                           </div>`
            },
            {
                title: 'Image above Text',
                template: `<div class = "column">
                           <div class="template-title">Why? Function declarations are hoisted, which means that it’s easy - too easy - to reference the function before it is defined in the file.</div>
                           <div class="template-image"><img src="./wall.png"></div>
                           </div>`
            },
            {
                title: 'Image right. Text left',
                template: `<div class = "column">
                           <div class="template-image"><img src="./cloud.png"></div>
                           <div class="template-title">Why? Function declarations are hoisted, which means that it’s easy - too easy - to reference the function before it is defined in the file.</div>
                           <div class="template-image"><img src="./god.png"></div></div>
                           </div>`
            },
            {
                title: 'Image right. Text left',
                template: `<div class = "row">
                           <div class="template-image"><img src="./cloud.png"></div>
                           <div class="template-image"><img src="./wall.png"></div>
                           <div class="template-title">Why? Function declarations are hoisted, which means that it’s easy - too easy - to reference the function before it is defined in the file.</div>
                           </div>`
            },
            {
                title: 'Image right. Text left',
                template: `<div class = "row">
                           <div class="template-image"><img src="./cloud.png"></div>
                           <div class="template-title">Why? Function declarations are hoisted, which means that it’s easy - too easy - to reference the function before it is defined in the file.</div>
                           <div class="template-image"><img src="./wall.png"></div>
                           </div>`
            },
        ].map(template => {
            return new Promise((resolve, reject) => {
                return Template.create(template).then(resolve).catch(reject);
            });

        })
    );
}