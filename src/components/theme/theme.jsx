import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default new class Theme {

  light()
  {
    return getMuiTheme(lightBaseTheme);

  }
  dark()
  {
    return getMuiTheme(darkBaseTheme);
  }
}
