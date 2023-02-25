import dayjs from "dayjs";



export const getFishProductFormBatchIdentifier = (formData) => {
    if (!formData) {
        return ""
    }

    const { facilityId, catchDate, species, amount, batchNumber } = formData

    if (facilityId && catchDate && species && amount && batchNumber) {

        // batchIdentifier = `fishing vessel id + date (YYMMDD) + short code for species + amount + dash + batch number`
        const batchIdentifier = `${facilityId}${dayjs(catchDate).format("YYMMDD")}${species}${amount}-${batchNumber}`
        return batchIdentifier
    }
    else {
        return ""
    }

}