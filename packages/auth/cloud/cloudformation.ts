export const getTemplate = () => template;

const template = {
  Parameters: {
    Environment: {
      Type: 'String',
      AllowedValues: ['Staging', 'Production'],
    },
  },
  Resources: {
    CognitoUserPool: {
      Type: 'AWS::Cognito::UserPool',
      Properties: {
        AutoVerifiedAttributes: ['email'],
        Policies: {
          PasswordPolicy: {
            MinimumLength: 8,
            RequireLowercase: false,
            RequireNumbers: false,
            RequireSymbols: false,
            RequireUppercase: false,
            TemporaryPasswordValidityDays: 30,
          },
        },
        UsernameAttributes: ['email'],
        UsernameConfiguration: {
          Casesensitive: false,
        },
        UserPoolName: {
          Ref: 'AWS::StackName',
        },
      },
    },
    CognitoUserPoolClient: {
      Type: 'AWS::Cognito::UserPoolClient',
      Properties: {
        SupportedIdentityProviders: ['COGNITO'],
        UserPoolId: {
          Ref: 'CognitoUserPool',
        },
      },
    },
  },
  Outputs: {
    UserPoolId: {
      Value: {
        Ref: 'CognitoUserPool',
      },
      Export: {
        Name: {
          'Fn:Join': [':', [{ Ref: 'AWS::StackName' }, 'UserPoolId']],
        },
      },
    },
    AppClientId: {
      Value: {
        Ref: 'CognitoUserPoolClient',
      },
      Export: {
        Name: {
          'Fn:Join': [':', [{ Ref: 'AWS::StackName' }, 'AppClientId']],
        },
      },
    },
  },
};
