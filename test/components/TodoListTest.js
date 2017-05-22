import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import expect from 'expect';
import TodoList from '../../src/components/TodoList';
import Main from '../../src/components/Main'

describe('TodoList', function() {
  it('renders without problems', function() {
    let todoList = ReactTestUtils.renderIntoDocument(<Main><TodoList/></Main>);
    expect(todoList).toExist();
  });
});
