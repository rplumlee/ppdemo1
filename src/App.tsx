import React from 'react';
import AddSection from './components/AddSection';
import ItemCard from './components/ItemCard';
import SectionCard from './components/SectionCard';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { motion } from 'framer-motion';
import { Parallax } from 'react-parallax';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import { MuiThemeProvider, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';

import './App.css';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#60D7A4',
      main: '#3cc68a',
      dark: '#029b59',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});


const initialSections = [
  {
    name: "Appetizers",
    order: 1,
    id: 1
  },
  {
    name: "Entrees",
    order: 2,
    id: 2
  },
  {
    name: "Desserts",
    order: 3,
    id: 3
  }
];

const initialItems = [
  {
    itemName: "Pizza",
    section: "Entrees",
    itemPrice: 25.95,
    itemDescription: "adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imgUrl: "https://i.pinimg.com/474x/81/24/2d/81242d0c48bd9a6b1cf660ce3a79f01f--national-cheese-pizza-day-italian-dinners.jpg",
    id: 1,
    gf: true,
    v: true,
    featured: false
  },
  {
    itemName: "Burger",
    section: "Entrees",
    itemPrice: 15.95,
    itemDescription: " sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imgUrl: "https://www.aspicyperspective.com/wp-content/uploads/2019/05/spicy-cowboy-bacon-burgers-recipe-31-256x256.jpg",
    id: 2,
    gf: true,
    v: true,
    featured: true
  },
  {
    itemName: "Fries",
    section: "Appetizers",
    itemPrice: 9.99,
    itemDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imgUrl: "https://s.hdnux.com/photos/44/75/06/9687479/3/rawImage.jpg",
    id: 3,
    gf: true,
    v: false,
    featured: false
  },
  {
    itemName: "Sweet Potatoe Fries",
    section: "Appetizers",
    itemPrice: 11.95,
    itemDescription: "Lorem ipsum dolor sit amet, c aliqua.",
    imgUrl: "https://bigoven-res.cloudinary.com/image/upload/t_recipe-256/the-perfect-sweet-potato-fries.jpg",
    id: 4,
    gf: true,
    v: false,
    featured: false
  },
  {
    itemName: "Soup",
    section: "Appetizers",
    itemPrice: 15.95,
    itemDescription: "Lorem ipsum dolor sit amet, consectetueiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imgUrl: "https://www.aspicyperspective.com/wp-content/uploads/2018/01/Skinny-Creamy-Chicken-Broccoli-Soup-100-256x256.jpg",
    id: 5,
    gf: false,
    v: true,
    featured: true
  },
  {
    itemName: "Panini",
    section: "Entrees",
    itemPrice: 15.95,
    itemDescription: "Lorem ipsum dolor sit amet,  ut labore et dolore magna aliqua.",
    imgUrl: "https://photos.bigoven.com/recipe/hero/pepporoni-panini-sandwich.jpg?h=300&w=300",
    id: 6,
    gf: true,
    v: false,
    featured: false
  },
  {
    itemName: "Cake",
    section: "Desserts",
    itemPrice: 15.95,
    itemDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imgUrl: "https://saraleedesserts.com/wp-content/uploads/2017/10/Nutella-Filled-Pound-Cake-256x256.jpg",
    id: 7,
    gf: true,
    v: true,
    featured: true
  },
  {
    itemName: "Pasta",
    section: "Entrees",
    itemPrice: 15.95,
    itemDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imgUrl: "https://ohsheglows.com/gs_images/2020/05/IMG_5643-256x256.jpg",
    id: 8,
    gf: false,
    v: false,
    featured: false
  }
]

interface Item{
  itemName?: string,
  itemPrice?: number,
  section?: string,
  itemDescription?: string,
  imgUrl?: string,
  id?: number,
  gf?: boolean,
  v?: boolean,
  featured?: boolean
}

interface Section{
  name: string,
  order: number,
  id: number
}


type ItemsActions = 
  | { type: "add"; item: Item}
  | { type: "remove"; item: Item}
  | { type: "update"; item: Item}

type SectionsActions = 
  | { type: "add"; section: Section}
  | { type: "remove"; section: Section}
  | { type: "update"; section: Section}

type State = {
  items: Item[],
  sections: Section[],
  openDrawer: boolean,
  openSection: boolean,
  focusedSection: Section
}

const ItemsReducer = (state: State["items"], action: ItemsActions) => {
  switch (action.type){
    case "add":
      let arr = state.sort((a,b) => { return a.id - b.id });
      let newID = arr[arr.length - 1].id + 1;
      action.item.id = newID;
      return [...state, action.item];
    case "remove": 
      return state.filter((item) => item.id !== action.item.id);
    case "update": 
      return state.map((item) => item.id === action.item.id ? action.item : item);
    default:
      return state;
  }
}

const SectionsReducer = (state: State["sections"], action: SectionsActions) => {

  switch (action.type){
    case "add":
      action.section.id = state[state.length -1] ? state[state.length -1].id + 1 : 1;
      let temp = state.map((section) => { section.order = (section.order >= action.section.order) ? section.order + 1 : section.order; return section })
     
      temp = [...temp, action.section];
       return temp.sort((a, b) => {return a.order - b.order});

    case "remove": 
      return state.map((section) => { section.order = (section.order >= action.section.order) ? section.order - 1 : section.order; return section }).filter((section) => section.id !== action.section.id);

    case "update": 
      let originalOrder:number = 0;
      state.map((section) => {if(section.id === action.section.id){originalOrder = section.order}});
      state = state.map((section) => {
        if(section.order > action.section.order){
          if(section.order < originalOrder ){
            section.order = section.order + 1
          }
        }
        else if(section.order < action.section.order){
          if(section.order > originalOrder ){
            section.order -= 1
          }
        }
        else if(section.order === action.section.order){
          if(section.order > originalOrder ){
            section.order -= 1
          }else{
            section.order += 1
          }
            
        }
        if(section.id === action.section.id){ section = action.section}
        return section
       })
       return state.sort((a, b) => {return a.order - b.order});
    default:
      return state;
  }
}


const useStyles = makeStyles({
  root: {
    margin: 10,
    paddingLeft: 20,
    paddingRight: 30,
    background: 'linear-gradient(45deg, #1db675 30%, #60d7a4 90%)',
    textTransform: "none",
    transition: ".2s all",
    fontWeight: 400,
    "&:hover": { 
      transform: "translateY(-6px)"
    }
  },
});


function App() {
  const [items, dispatchItems] = React.useReducer(ItemsReducer, initialItems);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openSection, setOpenSection] = React.useState(false);
  const [sections, dispatchSections] = React.useReducer(SectionsReducer, initialSections);
  const [focusedSection, setFocusedSection] = React.useState({name: "", order: 1, id: 0});

  const title = "Build Your Menu";
  React.useEffect(() => {
    document.title = title;
  }, [title]); // Only re-run the effect if count changes


  const classes = useStyles();
  const variants = {
    hidden: {
      opacity: 0,
      scale: .2
    },
    shown: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: .3,
        when: "beforeChildren",
        staggerChildren: 0.15 }
    } 
  }

  const renderCards = (items) => {
    let tempSections = sections.sort((a,b) => {return a.order - b.order});
    return tempSections.map((section, index) => {
      return (
        <motion.div key={section.id} variants={variants}>
          <h2 style={{cursor:"pointer",position:"relative",textAlign: "left", marginLeft: 15, marginBottom: 5}}  onClick={()=>{setFocusedSection(section); setOpenSection(true)}}>
            {section.name} 
            <span className="section-underline"></span></h2>
          <div className="grid">
          {items.map((item, index) => {
            if(item.section === section.name){
              
              return <motion.div key={item.id} style={{display: "inline-flex"}} variants={variants} className="app-card-container"><ItemCard item={item} sections={sections} handleDeleteItem={(item) => { dispatchItems({ type: "remove", item: item}) }} handleEditItem={(item) => { dispatchItems({ type: "update", item: item}) }} handleAddItem={()=>{}} demoCard={false} /></motion.div>;
            }
                     })}</div>
        </motion.div>
      )

    })
  };

const headerVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    color: "#ffffff"
  },
  shown: {
    opacity: 1,
    y: 0,
    color: "#ffffff",
    transition: { 
      duration: .5,
      when: "beforeChildren",
      staggerChildren: 0.2 }
  } 
}

const headerStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 550
}

const openAdd = () => {
  setOpenDrawer(true);
  setOpenSection(false);
}
const openAddSection = () => {
  setFocusedSection({name: "", order: 1, id: 0})
  setOpenSection(true);
  setOpenDrawer(false);
}



  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
      <Parallax
          blur={0}
          bgImage={require('./assets/parallax.jpg')}
          bgImageAlt="the cat"
          strength={400}
      ><div style={headerStyles}>
          <div className="headerBG"></div>
        
          <motion.div variants={headerVariants} initial={ "hidden" } animate={ "shown" } className="headerTitle">
              <motion.h1 className="title" variants={headerVariants}>Welcome to your menu</motion.h1>
              <motion.h6 className="title" variants={headerVariants}>Get started with one of the buttons below or click on an existing menu section or item to edit it.</motion.h6>
              <motion.div variants={headerVariants}>
                <Fab className={classes.root} variant="extended" color="primary" onClick={openAdd}>
                  <AddIcon />
                  <span style={{marginLeft:7, fontSize: "1.1em"}}>Add menu item</span>
                </Fab>
                <Fab className={classes.root} variant="extended" color="primary" onClick={openAddSection}>
                  <AddIcon />
                  <span style={{marginLeft:7, fontSize: "1.1em"}}>Add menu section</span>
                </Fab>
              </motion.div>
          </motion.div>

      </div>
      </Parallax>
      <div style={openDrawer ? {display: "block"} : {display : "none"}}>
        <ItemCard 
          item={{}} 
          sections={sections} 
          expandedProp={openDrawer} 
          handleAddItem = {item => { dispatchItems({ type: "add", item: item}) }}
          handleCloseCard = {() => { setOpenDrawer(false) }}
        />
      </div>
      <div style={openSection ? {display: "block"} : {display : "none"}}>
        <SectionCard 
          section={focusedSection} 
          sections={sections} 
          expandedProp={openSection} 
          handleAddSection = {section => { dispatchSections({ type: "add", section: section}) }}
          handleEditSection = {section => { dispatchSections({ type: "update", section: section}) }}
          handleDeleteSection = {section => { dispatchSections({ type: "remove", section: section}) }}
          handleCloseCard = {() => { setOpenSection(false); }}
        />
      </div>

      <motion.div className="grid-container" animate={ "shown" } initial={ "hidden" } variants={variants}>
        {renderCards(items)}
      </motion.div> 
      </MuiThemeProvider>
    </div>
  );
}

export default App;