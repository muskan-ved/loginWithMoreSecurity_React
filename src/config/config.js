export const BASE_URL = "https://vest-wasp.cyclic.app/api/";
export const FRONT_END_BASE_URL = "http://localhost:3000";
export const API = {

    generateToken: `${BASE_URL}generateToken`,
    receiptionRegister: `${BASE_URL}register`,
    receiptionLogin: `${BASE_URL}login`,

    visitorAdd: `${BASE_URL}addVisitor`,
    visitorList: `${BASE_URL}getVisitor`,
    visitorEdit: `${BASE_URL}updateVisitor`,
    visitorDelete: `${BASE_URL}deleteVisitor`,
    allVisitorDelete: `${BASE_URL}deleteMultiple`,

    receiptionistList: `${BASE_URL}getReceptioninst`,
    receiptionistEdit: `${BASE_URL}updateReceptioninst`,   

}
