//  --------  Post

// const CAlled = async () => {
//     await baseRequest.post(APIURLS.LOGIN, data)
//       .then(function (response) {
//         successHandler(response, {
//           notifyOnSuccess: true,
//           notifyOnFailed: true,
//           msg: 'success',
//           type: 'success'
//         })
//         return response.data;
//       })
//       .catch(function (error) {
//         console.log(error);
//         return errorHandler(error);
//       })
//   }

//  ----------  Get

// const CAlledGet = async () => {
//     await baseRequest.get('designation', {
//       params: {
//         designationParam: 'designation'
//       }
//     })
//       .then(function (response) {

//         successHandler(response, {
//           notifyOnSuccess: true,
//           notifyOnFailed: true,
//         })
//         console.log(response, 'l');
//         return response.data;
//       })
//       .catch(function (error) {
//         return errorHandler(error);
//       })
//   }