// import { address } from "../data/address";
// import { getQueryParam } from "../utils/parseParam";

// let addressList = address;

// const addressService = {
//   add(config) {
//     const { phone, tel, areas, name, address, detailAddress, isDefault } = JSON.parse(config.body);
//     let addressId = addressList.length < 10 ? `0${addressList.length + 1}` : addressList.length + 1;
//     addressList.push({
//       id: `ADDRESS_${addressId}`,
//       name,
//       phone,
//       tel,
//       areas,
//       address,
//       detailAddress,
//       isDefault,
//     });
//     return {
//       code: 20000,
//       data: {
//         message: "添加成功",
//       },
//     };
//   },
//   delete(config) {
//     const { id } = JSON.parse(config.body);
//     addressList = addressList.filter((item) => item.id !== id);
//     return {
//       code: 20000,
//       data: {
//         message: "删除成功",
//       },
//     };
//   },
//   update(config) {
//     const { id, phone, tel, areas, name, address, detailAddress, isDefault } = JSON.parse(config.body);
//     let updateIndex = addressList.findIndex((item) => item.id === id);
//     addressList[updateIndex] = {
//       id: id,
//       phone: phone,
//       tel: tel,
//       areas: areas,
//       name: name,
//       address: address,
//       detailAddress: detailAddress,
//       isDefault: isDefault,
//     };

//     return {
//       code: 20000,
//       data: {
//         message: "更新成功",
//       },
//     };
//   },
//   list(config) {
//     let queryParams = getQueryParam(config.url);
//     let { pageNum = 1, pageSize = 10 } = queryParams;
//     //  数据分页
//     const pageList = addressList.filter(
//       (item, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1)
//     );
//     return {
//       code: 20000,
//       data: {
//         total: addressList.length,
//         list: pageList,
//       },
//     };
//   },
//   detail(config) {
//     let queryParams = getQueryParam(config.url);
//     let { id } = queryParams;
//     //  数据分页
//     let curAddress = addressList.filter((item) => item.id === id);

//     return {
//       code: 20000,
//       data: {
//         list: curAddress,
//       },
//     };
//   },
// };
// export default addressService;
