const Template = require('./../src/models/template');

module.exports = () => {
    return Promise.all(
        [{
            title: 'Image left. Text right',
            template: `<div class = "row">
                        <div class="half template-image"></div>
                        <div class="half template-title"></div>
                    </div>`
        },
        {
            title: 'Image left. Text right',
            template: `<div class = "row">
                        <div class="half template-title"></div>
                    </div>`
        },
        {
            title: 'Image right. Text left',
            template: `<div class = "row">
                        <div class="half template-title"></div>
                        <div class="half template-image"></div>
                    </div>`
        },
        {
            title: 'Image above Text',
            template: `<div class = "column">
                        <div class="half template-image"></div>
                        <div class="half template-title"></div>
                    </div>`
        },
        {
            title: 'Image above Text',
            template: `<div class = "column">
                        <div class="half template-title"></div>
                        <div class="half template-image"></div>
                    </div>`
        }].map(template => {
            return new Promise((resolve, reject) => {
                return Template.create(template).then(resolve).catch(reject);
            });

        })
    );
}