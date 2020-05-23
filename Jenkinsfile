@Library('podTemplateLib')
import net.santiment.utils.podTemplates


properties([buildDiscarder(logRotator(artifactDaysToKeepStr: '30', artifactNumToKeepStr: '', daysToKeepStr: '30', numToKeepStr: ''))])

slaveTemplates = new podTemplates()

slaveTemplates.dockerTemplate { label ->
  node(label) {
    stage('Build') {
      container('docker') {
        def scmVars = checkout scm
        def gitHead = scmVars.GIT_COMMIT.substring(0,7)

        if (env.BRANCH_NAME == "master") {
          withCredentials([
            string(
              credentialsId: 'SECRET_KEY_BASE',
              variable: 'SECRET_KEY_BASE'
            ),
            string(
              credentialsId: 'aws_account_id',
              variable: 'aws_account_id'
            )
          ]) {
            // We are building two docker images - for stage and prod respectively. The app requires an env var BACKEND_URL set at build time.
            def awsRegistry = "${env.aws_account_id}.dkr.ecr.eu-central-1.amazonaws.com"
            docker.withRegistry("https://${awsRegistry}", "ecr:eu-central-1:ecr-credentials") {
              sh "docker build --build-arg BACKEND_URL=https://api-stage.santiment.net --build-arg GIT_HEAD=${gitHead} -t ${awsRegistry}/insights-app-stage:${env.BRANCH_NAME} -t ${awsRegistry}/insights-app-stage:${scmVars.GIT_COMMIT} ."
              sh "docker push ${awsRegistry}/insights-app-stage:${env.BRANCH_NAME}"
              sh "docker push ${awsRegistry}/insights-app-stage:${scmVars.GIT_COMMIT}"
            }
            docker.withRegistry("https://${awsRegistry}", "ecr:eu-central-1:ecr-credentials") {
              sh "docker build --build-arg BACKEND_URL=https://api.santiment.net --build-arg GIT_HEAD=${gitHead} -t ${awsRegistry}/insights-app-prod:${env.BRANCH_NAME} -t ${awsRegistry}/insights-app-prod:${scmVars.GIT_COMMIT} ."
              sh "docker push ${awsRegistry}/insights-app-prod:${env.BRANCH_NAME}"
              sh "docker push ${awsRegistry}/insights-app-prod:${scmVars.GIT_COMMIT}"
            }
          }
        }
      }
    }
  }
}
