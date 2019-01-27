import githubLogo from '../../assets/images/github.svg';
import packageJSON from '../../package.json';

document.body.insertAdjacentHTML('beforeend', `
  <a href="${packageJSON.repository}" target="_blank" id="github-logo">
    ${githubLogo}
  </a>
`);
