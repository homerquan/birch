import * as React from 'react';
import { List, ListItem } from '@material-ui/core/List';
import { white, grey500 } from '@material-ui/core/colors';
import { FiSearch as SearchIcon } from 'react-icons/fi';
import Divider from '@material-ui/core/Divider';

import Link from '../Link';
import {
  SearchContainer,
  SearchResultsContainer,
  SearchContainerBG,
  Search,
  HackySearchBG,
} from '../styled/SearchBox';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
      searchValue: '',
      resultsList: [],

      // TODO: find better way to get all page names
      pages: [
        { name: 'Home', tags: 'home', link: '/' },
        { name: 'Conversations', tags: 'conversations', link: '/asfads/conversations' },
        { name: 'Conversation Details', tags: 'conversation details', link: '/' },
        { name: 'Bots', tags: 'bots', link: '/apps' },
        { name: 'New Bot', tags: 'new bot', link: '/new_app' },
        { name: 'Knowledge', tags: 'knowledge', link: '/fasf/knowledge' },
        { name: 'Profile', tags: 'profile', link: '/profile' },
        { name: 'Login', tags: 'login', link: '/login' },
        { name: 'Register', tags: 'register', link: '/register' },
        { name: 'Help', tags: 'help', link: '/help' },
        { name: 'Privacy', tags: 'privacy', link: '/privacy' },
        { name: 'Admin', tags: 'admin', link: '/admin' },
        { name: 'Account', tags: 'account', link: '/account' },
        { name: 'Plugins', tags: 'plugins', link: '/asfsda/plugins' },
        { name: 'Notifications', tags: 'notifications', link: '/notifications' },
      ],
    };

    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.closeSearch = this.closeSearch.bind(this);
  }

  onFocus() {
    this.setState({ isFocused: true });
  }

  onChange(event) {
    const value = event.target.value;
    const resultsList = this.state.pages.filter(page => page.tags.includes(event.target.value));

    this.setState({
      searchValue: value,
      resultsList: value === '' ? [] : resultsList,
    });
  }

  closeSearch() {
    this.setState({
      isFocused: false,
      searchValue: '',
      resultsList: [],
    });
  }

  renderSearchResults() {
    return (
      <List style={{ padding: 0 }}>
        {this.state.resultsList.map(result => (
          <React.Fragment>
            <ListItem
              primaryText={result.name}
              containerElement={<Link to={result.link} />}
              onClick={this.closeSearch}
            />
            <Divider />
          </React.Fragment>
        ))}
      </List>
    );
  }

  render() {
    return (
      <SearchContainer>
        <HackySearchBG
          isFocused={this.state.isFocused}
          onClick={this.closeSearch}
        />
        <SearchContainerBG
          isFocused={this.state.isFocused}
          onClick={this.closeSearch}
        />
        <Search isFocused={this.state.isFocused}>
          <SearchResultsContainer>
            {this.state.resultsList.length ? this.renderSearchResults() : ''}
          </SearchResultsContainer>
          <SearchIcon
            color={this.state.isFocused ? grey500 : white}
            style={{ width: '20px', height: '20px' }}
          />
          <input
            type="text"
            placeholder={this.state.isFocused ? 'Search for a page' : ''}
            value={this.state.searchValue}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.onChange}
          />
        </Search>
      </SearchContainer>
    );
  }
}

export default SearchBox;
