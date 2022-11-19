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

  const [recipeName, setRecipeName] = useState('');
  const [mainPhoto, setMainPhoto] = useState('');
  const [isMainPhotoAdded, setIsMainPhotoAdded] = useState(false);
  const [time, setTime] = useState(0);
  const [tags, setTags] = useState([]);
  const [servings, setServings] = useState(0);
  const [option, setOption] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', measure: '' }]);
  const [steps, setSteps] = useState([
    { id: '1', imageUrl: '', description: '' },
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

  usePrompt(
    'Are you sure you want to leave this page? You have unsaved changes.',
    recipeName !== '' ||
      mainPhoto !== '' ||
      time !== 0 ||
      tags.length !== 0 ||
      servings !== 0 ||
      option !== '' ||
      ingredients[0].name !== '' ||
      ingredients[0].measure !== '' ||
      steps[0].imageUrl !== '' ||
      steps[0].description !== '' ||
      category !== ''
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
      setIsMainPhotoAdded(true);
      setMainPhoto(recipeImage);
      setServings(size);
      setOption(option);
      setTime(time);
      setCategory(categoryName);
      setTags(tags);
      setIngredients(ingredient);
      const stephotoAdd = step.map((st, i) =>
        st.imageUrl !== '' ? true : false
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
    setMainPhoto(URL.createObjectURL(e.target.files[0]));
  };

  const handleEditInstructionBtn = (e, index) => {
    instructionFileInput.current[index].click();
  };

  const handleInstructionPhoto = (e, index) => {
    const updatedPhoto = steps.map((step, i) =>
      index === i
        ? { ...step, imageUrl: URL.createObjectURL(e.target.files[0]) }
        : step
    );

    const updatedStatus = isStepsPhotoAdded.map((stats, i) =>
      index === i ? true : stats
    );

    setSteps(updatedPhoto);
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
      index === i ? { ...step, imageUrl: '' } : step
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
    const lastIdx = Number(steps.at(-1).id);
    setSteps([
      ...steps,
      { id: (lastIdx + 1).toString(), imageUrl: '', description: '' },
    ]);
    setStepsPhotoAdded([...isStepsPhotoAdded, false]);
  };

  const removeIngredient = (i) => {
    setIngredients((ingredients) =>
      ingredients.filter((ingredient, index) => index !== i)
    );
  };

  const removeInstruction = (i) => {
    setSteps((steps) => steps.filter((step, index) => index !== i));
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
    setSteps(stepsItems);
    const photoStatus = Array.from(isStepsPhotoAdded);
    const [reorderedStatus] = photoStatus.splice(result.source.index, 1);
    photoStatus.splice(result.destination.index, 0, reorderedStatus);
    setStepsPhotoAdded(photoStatus);
  };

  const checkInputs = () => {
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
    return true;
  };

  const saveRecipe = async () => {
    console.log('saving recipe...');
    const recipe = localStorage.getItem('recipe');
    if (recipe) {
      setShowRecipeWarningMsg(true);
    }
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
    setTimeout(() => {
      setSaveRecipeDoneMsg(false);
      navigate('/');
    }, 2000);
  };

  const submitRecipe = async () => {
    console.log('submitting recipe...');
    if (!checkInputs()) {
      return;
    }

    dispatch(
      createRecipe({
        recipeName: recipeName,
        time: Number(time),
        option: option,
        ingredient: ingredients,
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
      setTimeout(() => {
        setCreateRecipeDoneMsg(false);
        navigate('/');
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
    <Fragment>
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
        <Spinner />
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
    </Fragment>
  );
};

export default CreateRecipePage;
