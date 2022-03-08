import { queryByText, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import List from './List';

// [x] - Testing DOM;
// [x]  - debug;
// [x] - Firing events;
// [x] - Testing async actions;
// [ ] - Mocking API calls (msw);
// [ ] - Spies & Stubs;
// [ ] - Context (wrapper on render);

test('renders learn react link', () => {
  render(<List initialItems={['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']}/>);
  const linkElement = screen.getByText("orange");
  expect(linkElement).toBeInTheDocument();
});

describe('List Component', () =>{
  it('should render list items', () => {
    const { getByText } = render(<List initialItems={['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']}/>)

    expect(getByText('blue')).toBeInTheDocument()
    expect(getByText('green')).toBeInTheDocument()
  });

  it('should be able to add new item to the list', async () => {
    const { getByText, getByPlaceholderText, debug } = render(<List initialItems={[]}/>)

    const inputElement = getByPlaceholderText('New Item');
    const addButton = getByText('Add');

    debug()
    
    userEvent.type(inputElement, 'New')
    userEvent.click(addButton);

    debug()

    await waitFor(() => {
      expect(getByText('New')).toBeInTheDocument()
    })
  })

  it('should be able to remove item to the list', async () => {
    const { queryByText, getAllByText, getByPlaceholderText, debug } = render(<List initialItems={['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']}/>)

    const removeButtons = getAllByText('Remove');

    debug()
    
    userEvent.click(removeButtons[0]);

    debug()

    await waitForElementToBeRemoved(() => {
      return queryByText('red')
    })

    await waitFor(() => {
      expect(queryByText('red')).not.toBeInTheDocument()
    })
  })
});
