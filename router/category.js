const express = require('express');
const router = express.Router();
const connection = require('../mysql');
const bottomRouter = require('./bottomnav_bar');
const searchboxRouter = require('./search_box');

router.use(bottomRouter);
router.use(searchboxRouter);

router.get('/', (req, res) => {
    connection.query(`
        SELECT detailpage.*, COUNT(mythumbspage.itemIndex) AS thumbsCount
        FROM detailpage
        LEFT JOIN mythumbspage ON detailpage.itemIndex = mythumbspage.itemIndex AND mythumbspage.thumbsBool = 1
        GROUP BY detailpage.itemIndex
        ORDER BY thumbsCount DESC
        LIMIT 12
    `, (err, rows) => {
        if (err) {
            console.log(err);
            res.send('Error occurred');
            return;
        }

        let html = `
        <div class="category_all">
            <ol id="entryList" class="list_all">
        `;

        let tier = 1;

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const description = row.itemDescription.length > 50 ? row.itemDescription.substring(0, 30) + "..." : row.itemDescription;
            html += `
                <li class="best_type${tier}">
                    <div class="list_contents">
                        <div class="langking${tier}">BEST ${tier}</div>
                        <div class="list_content_name${tier}"><a href="detail/${row.itemIndex}">${row.itemName}</a></div>
                        <div class="list_content_content${tier}">${description}</div>
                        <div class="list_content_likes${tier}">${row.thumbsCount} Likes</div>
                    </div>
                </li>
            `;
            tier++;
        }

        html += `
            </ol>
        </div>
        `;

        res.render('category', { category: html });
    });
});


router.get('/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;
    connection.query('SELECT * FROM detailpage', (err, rows) => {
        if (err) {
            console.log(err);
            res.send('Error occurred');
            return;
        }
        connection.query(`SELECT * FROM detailpage WHERE categoryId = ${categoryId}`, (err, rows) => {
            if (err) {
                console.log(err);
                res.send('Error occurred');
                return;
            }

            let html = `
            <div class="category_all">
            <ol id="entryList" class="list_all">
        `;

            let tier = 1;

            for (let i = 0; i < 9 && i < rows.length; i++) {
                const row = rows[i];
                const description = row.itemDescription.length > 30 ? row.itemDescription.substring(0, 30) + "..." : row.itemDescription;
                html += `
                <li class="best_type${tier}">
                    <div class="list_contents">
                        <div class="langking01">BEST ${tier}</div>
                        <div class="list_content_name"><a href="/detail/${row.itemIndex}">${row.itemName}</a></div>
                        <div class="list_content_content">${description}</div>
                    </div>
                </li>
            `;
                tier++;
            }

            html += `
            </ol>
            </div>
        `;

            res.render('category', { category: html });
        });
    });
});

module.exports = router;