class Apifeatures {


    constructor(query, querystr) {

        this.query = query;
        this.querystr = querystr;
    }

    search() {

        const keyword = this.querystr.keyword ? {

            name: {

                $regex: this.querystr.keyword,
                $options: "i"
            }
        } : {};

        console.log(keyword);

        this.query = this.query.find({ ...keyword });

        return this;
    }

    filter() {


        const { category } = this.querystr || {};

        const newquerystr = category ? {

            category: category
        } : {};

        console.log(newquerystr);

        this.query = this.query.find(newquerystr);


        return this;
    }

    filterByPrice() {

        const { price } = this.querystr || {};

        const newquerystr = price ? {
            price: price
        } : {};

        let querystr = JSON.stringify(newquerystr);

        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(querystr));

        console.log(querystr);

        return this;
    }

    pagination(resultPerPage) {


        const currentPage = Number(this.querystr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query =  this.query.skip(skip).limit(resultPerPage);

        return this;

    }


}

module.exports = Apifeatures;