import React, { useState, useRef, Fragment, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/NavBar';
import './CreateRecipePage.css';

import RecipeBasicContent from '../components/RecipeBasicContent';
import IngredientContent from '../components/IngredientContent';
import RecipeStepContent from '../components/RecipeStepContent';
import { saveRecipeToLocal } from '../features/users/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe } from '../features/recipes/recipeSlice';

import { usePrompt } from '../hooks/NavigationBlocker';

import {
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import Spinner from '../components/Spinner';

const CreateRecipePage = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = new FormData();

  const [recipeName, setRecipeName] = useState('');
  const [mainPhoto, setMainPhoto] = useState('');
  const [isMainPhotoAdded, setIsMainPhotoAdded] = useState(false);
  const [time, setTime] = useState(0);
  const [tags, setTags] = useState([]);
  const [servings, setServings] = useState(0);
  const [option, setOption] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', measure: '' }]);
  const [steps, setSteps] = useState([
    { id: '1', stepImage: '', description: '' },
  ]);
  const [category, setCategory] = useState('');
  const [isStepsPhotoAdded, setStepsPhotoAdded] = useState([false]);

  const [error, setError] = useState('');
  const [showRecipeWarningMsg, setShowRecipeWarningMsg] = useState(false);

  const hiddenFileInput = useRef(null);
  const instructionFileInput = useRef([]);

  const [addBorder, setAddBorder] = useState(false);
  const [sameValueIndex, setSameValueIndex] = useState('');

  const [createRecipeDoneMsg, setCreateRecipeDoneMsg] = useState(false);
  const [saveRecipeDoneMsg, setSaveRecipeDoneMsg] = useState(false);
  const [disablePrompt, setDisablePrompt] = useState(false);

  usePrompt(
    'Are you sure you want to leave this page? You have unsaved changes.',
    !disablePrompt &&
      !createRecipeDoneMsg &&
      (recipeName !== '' ||
        mainPhoto !== '' ||
        time !== 0 ||
        tags.length !== 0 ||
        servings !== 0 ||
        option !== '' ||
        ingredients[0]?.name !== '' ||
        ingredients[0]?.measure !== '' ||
        steps[0]?.stepImage !== '' ||
        steps[0]?.description !== '' ||
        category !== '')
  );

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    const value = e.target.value;
    if (!value.trim()) return;
    if (tags.indexOf(value) !== -1) {
      const index = tags.indexOf(value);
      setTimeout(() => {
        setSameValueIndex('');
      }, 300);
      setSameValueIndex(index);
      return;
    }
    setTags([...tags, value]);
    e.target.value = '';
  };

  const removeTag = (index) => {
    setTags(tags.filter((el, i) => i !== index));
  };

  const focusBorder = () => {
    setAddBorder(true);
  };

  const unFocusBorder = () => {
    setAddBorder(false);
  };

  const recipeError = useSelector((state) => state.recipes.error);
  const isLoading = useSelector((state) => state.recipes.loading);

  useEffect(() => {
    if (state) {
      const localRecipe = JSON.parse(state);
      const {
        recipeName,
        recipeImage,
        size,
        option,
        time,
        categoryName,
        tags,
        ingredient,
        step,
      } = localRecipe;
      setRecipeName(recipeName);
      if (recipeImage) setIsMainPhotoAdded(true);
      setMainPhoto(recipeImage);
      setServings(size);
      setOption(option);
      setTime(time);
      setCategory(categoryName);
      setTags(tags);
      setIngredients(ingredient);
      const stephotoAdd = step.map((st, i) =>
        st.stepImage !== '' ? true : false
      );
      setStepsPhotoAdded(stephotoAdd);
      setSteps(step);
      localStorage.removeItem('recipe');
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setError(recipeError);
  }, [recipeError]);

  const handleEditMainBtn = (e) => {
    hiddenFileInput.current.click();
  };

  const handleMainPhoto = (e) => {
    setIsMainPhotoAdded(true);
    const file = e.target.files[0];
    formData.append('images', file);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setMainPhoto(reader.result);
    };
  };

  const handleEditInstructionBtn = (e, index) => {
    instructionFileInput.current[index].click();
  };

  const handleInstructionPhoto = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      const updatedPhoto = steps.map((step, i) =>
        index === i ? { ...step, stepImage: reader.result } : step
      );
      setSteps(updatedPhoto);
    };

    const updatedStatus = isStepsPhotoAdded.map((stats, i) =>
      index === i ? true : stats
    );

    setStepsPhotoAdded(updatedStatus);
  };

  const handleEditInstructionMsg = (e, index) => {
    const updatedInstructions = steps.map((step, i) =>
      index === i ? { ...step, description: e.target.value } : step
    );
    setSteps(updatedInstructions);
  };

  const removePhoto = () => {
    setMainPhoto(null);
    setIsMainPhotoAdded(false);
  };

  const removeStepsPhoto = (e, index) => {
    const updatedSteps = steps.map((step, i) =>
      index === i ? { ...step, stepImage: '' } : step
    );

    const updatedStatus = isStepsPhotoAdded.map((stats, i) =>
      index === i ? false : stats
    );
    setSteps(updatedSteps);
    setStepsPhotoAdded(updatedStatus);
  };

  const onTimeChange = (e) => {
    setTime(e.target.value);
  };

  const onServingChange = (e) => {
    setServings(e.target.value);
  };

  const onOptionChange = (e) => {
    setOption(e.target.value);
  };

  const onCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const onRecipeNameChange = (e) => {
    setRecipeName(e.target.value);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', measure: '' }]);
  };

  const addInstruction = () => {
    const lastIdx = Number(steps.at(-1)?.id ?? 0);
    setSteps([
      ...steps,
      { id: (lastIdx + 1).toString(), stepImage: '', description: '' },
    ]);
    setStepsPhotoAdded([...isStepsPhotoAdded, false]);
  };

  const removeIngredient = (i) => {
    setIngredients((ingredients) =>
      ingredients.filter((ingredient, index) => index !== i)
    );
  };

  const removeInstruction = (i) => {
    const filteredItems = steps.filter((step, index) => index !== i);
    const updatedStepItems = filteredItems.map((step, i) => {
      return { ...step, id: (i + 1).toString() };
    });
    setSteps(updatedStepItems);
    setStepsPhotoAdded((stats) => stats.filter((stat, ind) => ind !== i));
  };

  const handleIngredientChange = (e, index) => {
    const { name, value } = e.target;
    const updatedIngredients = ingredients.map((ingredient, i) =>
      index === i ? { ...ingredient, [name]: value } : ingredient
    );
    setIngredients(updatedIngredients);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const stepsItems = Array.from(steps);
    const [reorderedItem] = stepsItems.splice(result.source.index, 1);
    stepsItems.splice(result.destination.index, 0, reorderedItem);

    const updatedStepItems = stepsItems.map((step, i) => {
      return { ...step, id: (i + 1).toString() };
    });
    setSteps(updatedStepItems);
    const photoStatus = Array.from(isStepsPhotoAdded);
    const [reorderedStatus] = photoStatus.splice(result.source.index, 1);
    photoStatus.splice(result.destination.index, 0, reorderedStatus);
    setStepsPhotoAdded(photoStatus);
  };

  const checkInputs = async () => {
    if (!recipeName) {
      setError('Please enter recipe name.');
      return false;
    }
    if (!time) {
      setError('Please enter time.');
      return false;
    }
    if (!servings) {
      setError('Please enter serving size.');
      return false;
    }
    if (!mainPhoto) {
      setError('Please add main dish photo.');
      return false;
    }
    if (steps.length === 0) {
      setError('Please add instructions.');
      return false;
    }
    if (ingredients.length === 0) {
      setError('Please add ingredients.');
      return false;
    }

    const noMeasure = ingredients.find(
      (ingredient) => ingredient.name && !!ingredient.measure?.trim() === false
    );

    if (noMeasure) {
      setError('Measurement is missing for ingredients.');
      return false;
    }
    return true;
  };

  const saveRecipe = async () => {
    console.log('saving recipe...');
    const recipe = localStorage.getItem('recipe');
    if (recipe) {
      setShowRecipeWarningMsg(true);
      return;
    }
    setError('');
    dispatch(
      saveRecipeToLocal({
        recipeName: recipeName,
        time: Number(time),
        option: option,
        ingredient: ingredients,
        categoryName: category,
        size: Number(servings),
        step: steps,
        tags: tags,
        recipeImage: mainPhoto,
      })
    );
    setSaveRecipeDoneMsg(true);
    setDisablePrompt(true);
    setTimeout(() => {
      setSaveRecipeDoneMsg(false);
    }, 2000);
  };

  const submitRecipe = async () => {
    console.log('submitting recipe...');
    const inputValidation = await checkInputs();
    if (!inputValidation) {
      return;
    }
    setError('');
    const realIngredients = ingredients.filter(
      (ingredient) => !!ingredient.name?.trim() && !!ingredient.measure?.trim()
    );
    dispatch(
      createRecipe({
        recipeName: recipeName,
        time: Number(time),
        option: option,
        ingredient: realIngredients,
        categoriesName: category,
        size: Number(servings),
        step: steps,
        tags: tags,
        recipeImage: mainPhoto,
      })
    );
    if (recipeError) {
      setError(recipeError);
      return;
    } else {
      setCreateRecipeDoneMsg(true);
      setDisablePrompt(true);
      setTimeout(() => {
        setCreateRecipeDoneMsg(false);
        navigate(-1);
      }, 2000);
    }
  };

  const handleCloseWarningMsg = () => {
    setShowRecipeWarningMsg(false);
  };

  const showErrorMessage = (
    <Alert
      //uncomment if you don't want icon in your alert
      // icon={false}
      variant='outlined'
      severity='error'
      className='CreateRecipe-errorMsg'
      onClose={() => {
        setError('');
      }}>
      {error}
    </Alert>
  );

  const showCreateRecipeDoneMsg = (
    <Alert
      severity='success'
      color='info'
      className='CreateRecipe-createRecipeDoneMsg'>
      Recipe created successfully!
    </Alert>
  );

  const showSaveRecipeDoneMsg = (
    <Alert
      severity='success'
      color='info'
      className='CreateRecipe-createRecipeDoneMsg'>
      Recipe saved successfully!
    </Alert>
  );

  return (
    <>
      {!isLoading && createRecipeDoneMsg ? showCreateRecipeDoneMsg : ''}
      {saveRecipeDoneMsg && showSaveRecipeDoneMsg}
      <Navbar />
      {error && showErrorMessage}
      {showRecipeWarningMsg && (
        <>
          <Dialog
            open={showRecipeWarningMsg}
            onClose={handleCloseWarningMsg}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'>
            <DialogTitle id='alert-dialog-title'>
              {'You already have one recipe saved.'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                Would you like to replace with current recipe? Your old recipe
                will be deleted.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseWarningMsg} autoFocus>
                Nevermind
              </Button>
              <Button
                onClick={() => {
                  localStorage.removeItem('recipe');
                  handleCloseWarningMsg();
                  saveRecipe();
                }}>
                Yes, Continue!
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
      {isLoading ? (
        <div className='CreateRecipe-spinnerContainer'>
          <div>
            <Spinner />
          </div>
        </div>
      ) : (
        <>
          <RecipeBasicContent
            ref={hiddenFileInput}
            onServingChange={onServingChange}
            servings={servings}
            onOptionChange={onOptionChange}
            option={option}
            onTimeChange={onTimeChange}
            category={category}
            onCategoryChange={onCategoryChange}
            time={time}
            isMainPhotoAdded={isMainPhotoAdded}
            mainPhoto={mainPhoto}
            removePhoto={removePhoto}
            handleMainPhoto={handleMainPhoto}
            recipeName={recipeName}
            onRecipeNameChange={onRecipeNameChange}
            onChangeRecipeName={(recipeName) => setRecipeName(recipeName)}
            onTagsChange={(tag) => setTags(tag)}
            handleEditMainBtn={handleEditMainBtn}
            addBorder={addBorder}
            tags={tags}
            sameValueIndex={sameValueIndex}
            handleKeyDown={handleKeyDown}
            removeTag={removeTag}
            focusBorder={focusBorder}
            unFocusBorder={unFocusBorder}
          />
          <IngredientContent
            ingredients={ingredients}
            handleIngredientChange={handleIngredientChange}
            removeIngredient={removeIngredient}
            addIngredient={addIngredient}
          />
          <RecipeStepContent
            handleOnDragEnd={handleOnDragEnd}
            steps={steps}
            handleEditInstructionMsg={handleEditInstructionMsg}
            isStepsPhotoAdded={isStepsPhotoAdded}
            ref={instructionFileInput}
            removeStepsPhoto={removeStepsPhoto}
            handleEditInstructionBtn={handleEditInstructionBtn}
            handleInstructionPhoto={handleInstructionPhoto}
            removeInstruction={removeInstruction}
            addInstruction={addInstruction}
          />
          <div className='CreateRecipe-submitBtnContainer'>
            <button className='CreateRecipe-saveBtn' onClick={saveRecipe}>
              Save
            </button>
            <button className='CreateRecipe-postBtn' onClick={submitRecipe}>
              Post
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default CreateRecipePage;
