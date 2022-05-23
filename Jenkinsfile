pipeline {
    agent {
        label 'build_java_11'
    }
    triggers{
        // Triggers pipeline for every 1hr
        pollSCM '0 * * * *'
    }
   
    stages {

        stage ('Source code'){
            steps {
                git url: 'https://github.com/nrajulearning/openmrs-core.git',
                branch: 'master'
            }
        }
        stage('Build the code and sonarqube-analysis'){
        steps {
            withSonarQubeEnv('sonar-9.4.0') {
                 sh 'mvn clean package sonar:sonar'
              }

            }
        }

        stage("Quality Gate") {
            steps {
              timeout(time: 1, unit: 'HOURS') {
                waitForQualityGate abortPipeline: true
              }
            }
        }
          
          
        stage('Results'){
        steps {
                junit '**/target/surefire-reports/TEST-*.xml'
                archiveArtifacts '**/target/*.jar'          
            }
        }
    }
        post {
        success {
            echo 'Build creation is successfully'
            }
        }
}