import React from 'react';

const RecipeDetailSteps = (props) => {
  const {
    isTabView1On,
    tabView1On,
    tabView1,
    tabView1OnClick,
    tabView2OnClick,
    isTabView2On,
    tabView2On,
    tabView2,
    tabView3OnClick,
    isTabView3On,
    tabView3On,
    tabView3,
    steps,
  } = props;
  return (
    <div className='RecipeDetail-stepContainer'>
      <div className='RecipeDetail-stepTitleContainer'>
        <label className='RecipeDetail-stepTitle'>Steps</label>
        <div>
          <button className='RecipeDetail-stepBtnBox' onClick={tabView1OnClick}>
            <img
              src={isTabView1On ? tabView1On : tabView1}
              alt='imgTextView'
              className='RecipeDetail-imageTextIcon'
            />
          </button>
          <button className='RecipeDetail-stepBtnBox' onClick={tabView2OnClick}>
            <img
              src={isTabView2On ? tabView2On : tabView2}
              alt='imgTextView'
              className='RecipeDetail-imageTextIcon'
            />
          </button>
          <button className='RecipeDetail-stepBtnBox' onClick={tabView3OnClick}>
            <img
              src={isTabView3On ? tabView3On : tabView3}
              alt='imgTextView'
              className='RecipeDetail-imageTextIcon'
            />
          </button>
        </div>
      </div>
      <div
        className={
          isTabView1On
            ? 'RecipeDetail-tabView1'
            : isTabView2On
            ? 'RecipeDetail-tabView2'
            : 'RecipeDetail-tabView3'
        }>
        {steps?.length > 1 ? (
          steps?.map((step, i) => (
            <div key={step._id} className='RecipeDetail-stepBox'>
              {isTabView1On || isTabView2On ? (
                <>
                  <div className='RecipeDetail-stepTextBox'>
                    <div className='RecipeDetail-stepNumber'>{i + 1}</div>
                    <p className='RecipeDetail-stepText'>
                      {step.description || 'No description provided'}
                    </p>
                  </div>
                  {isTabView1On ? (
                    step.stepImage ? (
                      <img
                        src={step.stepImage}
                        alt='no img available'
                        className='RecipeDetail-stepPhoto'
                      />
                    ) : (
                      <div className='RecipeDetail-stepPhotoNoPhoto'>
                        <p className='RecipeDetail-stepPhotoNoPhotoText'>
                          No Image Found
                        </p>
                      </div>
                    )
                  ) : null}
                </>
              ) : (
                <div className='RecipeDetail-tabView3Box'>
                  <div className='RecipeDetail-tabView3TextBox'>
                    <div className='RecipeDetail-stepNumber'>{i + 1}</div>
                    <p className='RecipeDetail-stepText'>
                      {step.description || 'No description provided'}
                    </p>
                  </div>
                  {step.stepImage ? (
                    <img
                      src={step.stepImage}
                      alt='no img available'
                      className='RecipeDetail-tabView3stepPhoto'
                    />
                  ) : (
                    <div className='RecipeDetail-tabView3stepPhotoNoneBox'>
                      <p className='RecipeDetail-tabView3stepPhotoNoneText'>
                        No Image Found
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div>No Steps Found</div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetailSteps;
