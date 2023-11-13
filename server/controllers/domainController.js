const Service = require("../models/Service");

const getServicesOfDomain = async (req, res) => {
    const q = req.query;
    const param = req.params.param;
    const domain = param.split('-')[0];
    const service = param.split('-')[1];

    try {
        if (JSON.stringify(q) === "{}") {
            if (!domain) {
                return res.status(400).json({ message: "no domain selected!" });
            }

            const services = await Service.find({ service_type: service, domain_type: domain }).exec();
            return res.status(200).json({ data: services });
        }

        let services = [];
        if (q.hours) {
            services = await Service.find({ service_type: service, domain_type: domain, min_duration: { $lte: q.hours }, starting_price: { $gte: q.min, $lte: q.max } }).exec();
            console.log(services);
        }
        else {
            services = await Service.find({ service_type: service, domain_type: domain, starting_price: { $gte: q.min, $lte: q.max } }).exec();
            console.log(services);
        }

        return res.status(200).json({ data: services });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {getServicesOfDomain}