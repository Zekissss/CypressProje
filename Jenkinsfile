pipeline {
   
   agent any
   
   options {
       ansiColor('xterm')
   }
   
   tools {
       nodejs "Node 20.5.0"
   }
   
   environment {
       CYPRESS_RECORD_KEY = 'edaab541-057d-4599-9d75-c72c02d22094'  // Sizin Cypress Record Key'iniz
       CYPRESS_PROJECT_ID = 'q6icf'  // Sizin Cypress Project ID'niz
   }

   parameters {
        string(
            name: 'TEST_SPEC', 
            defaultValue: 'cypress/e2e/tests/*.cy.js', 
            description: 'Enter the name of the test spec without file extension e.g. LoginTest. Default value will run all the test specs present inside cypress/e2e/tests/ directory.'
        )
        string(
            name: 'RECORD_TESTS', 
            defaultValue: '--record false', 
            description: 'Within CI, you can pass --record argument to record the test runs to later view on cypress dashboard. Remove the false to record the tests.'
        )
        choice(
            name: 'TEST_ENVIRONMENT', 
            choices: [
                'local',
                'dev',
                'qa',
                'stage',
                'prod',
            ], 
            description: 'Specify the test environment. Default will be local.'
        )
        choice(
            name: 'BROWSER', 
            choices: ['electron', 'chrome', 'edge', 'firefox'], 
            description: 'Pick the web browser you want to use to run your scripts. Default will be electron.'
        )
        choice(
            name: 'BROWSER_MODE', 
            choices: ['headless', 'headed'], 
            description: 'By default, Cypress will run tests headlessly. Passing --headed will force the browser to be shown.'
        )
        choice(
            name: 'TAG', 
            choices: [
                '@regression', 
                '@smoke', 
                '@Login', 
                '@productData', 
                '@Search', 
                '@Wishlist', 
                '@Cart'
            ], 
            description: 'Choose the test tag to filter your test scripts'
        )
    }

   stages {
       stage('Stage 1 - Checkout Code') {
            steps {
                git url: 'https://github.com', branch: 'main'
                echo 'Code is checked out'
            }
       }
       
       stage('Stage 2 - Installing dependencies') {
           steps {
               sh 'npm install'
               echo 'Dependencies installed'
           }
       }
       
       stage('Stage 3 - Clearing old reports') {
           steps {
               sh "npm run report:pre"
           }
       }
       
       stage('Stage 4 - Running Cypress e2e Tests') {
            steps {
                script {
                    if (params.TEST_SPEC == "cypress/e2e/tests/*.cy.js") {
                        echo "Running all test scripts with Browser: ${params.BROWSER}, TAG: ${params.TAG}, Environment: ${params.TEST_ENVIRONMENT}"
                        sh "npx cypress run --${params.BROWSER_MODE} --browser ${params.BROWSER} --env environmentName=${params.TEST_ENVIRONMENT},grepTags=${params.TAG} ${params.RECORD_TESTS} --record --key $CYPRESS_RECORD_KEY --project-id $CYPRESS_PROJECT_ID"
                    } else {
                        echo "Running script: ${params.TEST_SPEC} with Browser: ${params.BROWSER}, TAG: ${params.TAG}, Environment: ${params.TEST_ENVIRONMENT}"
                        sh "npx cypress run --spec cypress/e2e/tests/${params.TEST_SPEC}.cy.js --${params.BROWSER_MODE} --browser ${params.BROWSER} --env environmentName=${params.TEST_ENVIRONMENT},grepTags=${params.TAG} ${params.RECORD_TESTS} --record --key $CYPRESS_RECORD_KEY --project-id $CYPRESS_PROJECT_ID"
                    }
                }
            }
       }
       
       stage('Stage 5 - Merging JUnit reports') {
           steps {
               sh "npm run report:post"
           }
       }
   }
   
   post {
        always {
            echo 'Publishing the Extent Report'
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: false,
                keepAll: true,
                reportDir: 'cypress/results/cypress-mochawesome-reporter',
                reportFiles: 'index.html',
                reportName: 'Cypress Mochawesome Report',
                reportTitles: 'Cypress Test Automation Framework',
                useWrapperFileDirectly: true
            ])
            
            script {
                echo 'Publishing JUnit XML Results'
                def testResults = junit testResults: 'cypress/results/junit/combined-report.xml'
                
                def COLOR_MAP = [
                    'SUCCESS'   : '#4CAF50',   // Green
                    'FAILURE'   : '#F44336',   // Red
                    'UNSTABLE'  : '#FFC107',   // Yellow
                    'ABORTED'   : '#9E9E9E',   // Grey
                    'NOT_BUILT' : '#2196F3',   // Blue
                    'UNKNOWN'   : '#CCCCCC'    // Light Gray
                ]
                
                echo 'Sending Slack Notification'
                slackSend channel: '#cypress-framework-jenkins',
                          color: COLOR_MAP[currentBuild.currentResult],
                          message: "*${currentBuild.currentResult}*\n *Job*: ${env.JOB_NAME} , *Build*: ${env.BUILD_NUMBER}\n *Test Results*: \n\t Total: ${testResults.totalCount} Passed: ${testResults.passCount} Failed: ${testResults.failCount} Skipped: ${testResults.skipCount}\n *Test Run Configuration*:\n\t *Test Script(s)*: ${params.TEST_SPEC}\n\t *Browser*: ${params.BROWSER}  ${params.BROWSER_MODE}\n\t *Tags*: ${params.TAG}\n\t *Environment*: ${params.TEST_ENVIRONMENT}\n\t *Dashboard Recording*: ${params.RECORD_TESTS}\n *Test Report*: ${env.BUILD_URL}Cypress_20Mochawesome_20Report/ \n *More info*: ${env.BUILD_URL}"
            }
        }
        
        success {
            echo 'Build Successful'
        }

        failure {
            echo 'Build Failed'
        }

        unstable {
            echo 'Build unstable'
        }
    }
}
