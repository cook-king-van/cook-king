import React from 'react';
import DetailImag from '../../images/TempFood2.png'
import './RecipeDetail.css'
// class StepDetail {
//   static DetailNum = 0;
//   NowNum = 0;
//   constructor() {
//     this.DetailNum++;
//     this.NowNum = this.DetailNum;
//     return (
//       <>
//         <div className='StepDetail-Box'>
//           Tell me the step
//           <img src={DetailImag} />
//         </div>
//       </>
//     );
//   }
// }
const StepDetail = () => {
  return (
    <>
      <div className='StepDetail-Box'>
        Tell me the step
        <img src={DetailImag} />
      </div>
    </>
  );
}

export default StepDetail;