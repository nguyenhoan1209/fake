import type { Namespace, TFunction } from 'i18next';

export enum KeyConfigurationCallScoring {
  KeywordCategory,
  KeyWord,
  InformationField,
  GetInformation,
  CriteriaGroup,
  Criteria,
  GradingForm,
  QA,
  Question,
}

export const convertKeyConfigurationCallScoringFromValueToName = (key: number): string => {
  switch (key) {
    case KeyConfigurationCallScoring.KeywordCategory:
      return 'KeywordCategory';
    case KeyConfigurationCallScoring.KeyWord:
      return 'KeyWord';
    case KeyConfigurationCallScoring.InformationField:
      return 'InformationField';
    case KeyConfigurationCallScoring.GetInformation:
      return 'GetInformation';
    case KeyConfigurationCallScoring.CriteriaGroup:
      return 'CriteriaGroup';
    case KeyConfigurationCallScoring.Criteria:
      return 'Criteria';
    case KeyConfigurationCallScoring.GradingForm:
      return 'GradingForm';
    case KeyConfigurationCallScoring.QA:
      return 'QA';
    case KeyConfigurationCallScoring.Question:
      return 'Question';
    default:
      return '';
  }
};

export const convertKeyConfigurationCallScoringFromValueToText = (key: number, t: TFunction<Namespace>): string => {
  switch (key) {
    case KeyConfigurationCallScoring.KeywordCategory:
      return t('config_call_scoring.name_configuration.configure_keyword_categories');
    case KeyConfigurationCallScoring.KeyWord:
      return t('config_call_scoring.name_configuration.keyword_configuration');
    case KeyConfigurationCallScoring.InformationField:
      return t('config_call_scoring.name_configuration.configure_information_fields');
    case KeyConfigurationCallScoring.GetInformation:
      return t('config_call_scoring.name_configuration.configure_form_to_retrieve_information');
    case KeyConfigurationCallScoring.CriteriaGroup:
      return t('config_call_scoring.name_configuration.configure_criteria_groups');
    case KeyConfigurationCallScoring.Criteria:
      return t('config_call_scoring.name_configuration.configure_criteria');
    case KeyConfigurationCallScoring.GradingForm:
      return t('config_call_scoring.name_configuration.configure_the_grading_form');
    case KeyConfigurationCallScoring.QA:
      return t('config_call_scoring.name_configuration.configuration_Q&A');
    case KeyConfigurationCallScoring.Question:
      return t('config_call_scoring.name_configuration.question_configuration');
    default:
      return '';
  }
};
