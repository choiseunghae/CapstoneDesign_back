const express = require('express');
const router = express.Router();
const connection = require('../mysql');
const bottomRouter = require('./bottomnav_bar');

router.use(bottomRouter);

router.get('/', (req, res) => {
    connection.query('SELECT * FROM detailpage', (err, rows) => {
        if (err) {
            console.log(err);
            res.send('Error occurred');
            return;
        }

        let html = `

        <ul class="category__theme">
            <li class="category__btn"><a class="category__link" href="#">전체</a></li>
            <li class="category__btn"><a class="category__link" href="#">자음</a></li>
            <li class="category__btn"><a class="category__link" href="#">모음</a></li>
            <li class="category__btn"><a class="category__link" href="#">줄임말</a></li>
            <li class="category__btn"><a class="category__link" href="#">신조어</a></li>
            <li class="category__btn"><a class="category__link" href="#">영어</a></li>
            <li class="category__btn"><a class="category__link" href="#">응용</a></li>
        </ul>

        <div class="category_all">
        <ol id="entryList" class="list_all">
        `

        tier = 1;

        for (let i = 0; i < 9 && i < rows.length; i++) {
            const row = rows[i];
            const description = row.itemDescription.length > 30 ? row.itemDescription.substring(0, 30) + "..." : row.itemDescription;
            html += `
                <li class="best_type${tier}">
                    <div class="list_contents">
                        <div class="langking01">BEST ${tier}</div>
                        <div class="list_content_name"><a href="detail/${row.itemIndex}">${row.itemName}</a></div>
                        <div class="list_content_content">${description}</div>
                    </div>
                </li>
            `;
            tier++;
        }
        

        html += `</ol>
                </div>`

        res.render('category', { category: html });
    });
});


module.exports = router;