const inquirer = require('inquirer');
// const fs = require('fs');
// const generatePage = require('./src/page-template');

// console.log(name, github);

// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });

const promptUser = () => {
    return inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
        Validate: nameInput => {
            if (nameInput) {
                return true;

            } else {
                console.log('Please enter your name!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username',
        Validate: gitHubInput => {
            if (gitHubInput) {
                return true;

            } else {
                console.log('Please enter a valid gitHub username!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        Validate: infoInput => {
            if (infoInput) {
                return true;

            } else {
                console.log('Please enter some infromartion');
                return false;
            }
        }
        
    }
]);
};

const promptProject = portfolioData => {
    console.log(`=====================
    Add a new Project
    ======================
    `);

    // If there's no 'projects' array property, create one
    if(!portfolioData.projects) {
        portfolioData.projects = [];
    }
    
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project'
        },
        {
            type: 'input',
            name: 'description',
            messahe: 'Provide a description of the project (Required)'


        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
          },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)'
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        },
    ])

.then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
    }
  });
};

promptUser()
.then(promptProject)
.then(portfolioData => {
  console.log(portfolioData);
  // will be uncommented in lesson 4
  // const pageHTML = generatePage(portfolioData);
  // fs.writeFile('./index.html', pageHTML, err => {
  //   if (err) throw new Error(err);
  //   console.log('Page created! Check out index.html in this directory to see it!');
  // });
});