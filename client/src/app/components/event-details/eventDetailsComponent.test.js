import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { EventDetailsComponent } from './EventDetailsComponent';
import ChatWindowComponentRedux, { ChatWindowComponent } from './ChatWindowComponent';

Enzyme.configure({ adapter: new Adapter() });

const event = {
  address: "Paryz'koi Komuny St, Kherson, Khersons'ka oblast, Ukraine, 73000",
  category: { id: 8, name: 'Physics', key: 'category-physics' },
  date: '2018-05-29T08:54:00.000Z',
  description: '',
  id: 61,
  location: { lat: 46.6376803, lng: 32.6181838 },
  title: 'test event 1',
  user: { name: 'user1' },
  visitors: []
};

describe('testing eventDetails component', () => {
  const subscribedVisitor = { updatedAt: '2018-05-29T12:06:09.791Z', user: { name: 'user2' } };
  const subscribedVisitors = [{ updatedAt: '2018-05-29T12:06:09.791Z', user: { name: 'user2' } }, { updatedAt: '2018-05-29T12:06:09.791Z', user: { name: 'user3' } }, { updatedAt: '2018-05-29T12:06:09.791Z', user: { name: 'user4' } }];
  const userHost = { name: 'user1' };
  const subscribedUser = { name: 'user2' };
  const unSubscribedUser = { name: 'user3' };
  const unathenticatedUser = null;

  const propsSubscribe = { event, user: unSubscribedUser };
  const propsUnsubscribe = { event: { ...event, visitors: [subscribedVisitor] }, user: subscribedUser };
  const propsHost = { event, user: userHost };
  const unathenticatedProps = { event, user: unathenticatedUser };
  const propsRenderVisitors = { event: { ...event, visitors: subscribedVisitors }, user: userHost };
  const propsChat = { user: userHost, messages: [{ message: 'hello', updatedAt: '2018-05-29T12:06:54.691Z', user: userHost }, { message: 'world', updatedAt: '2018-05-29T12:13:56.720Z', user: userHost }] };

  it('subscribe button shows up', () => {
    const wrapper = shallow(<EventDetailsComponent {...propsSubscribe} />);
    const buttons = wrapper.find('.event-details-card__info-area-subscribe-btn');
    expect(buttons).toHaveLength(1);
    expect(buttons.childAt(0).text()).toBe('subscribe');
  });

  it('unsubscribe button shows up', () => {
    const wrapper = shallow(<EventDetailsComponent {...propsUnsubscribe} />);
    const buttons = wrapper.find('.event-details-card__info-area-subscribe-btn');
    expect(buttons).toHaveLength(1);
    expect(buttons.childAt(0).text()).toBe('unsubscribe');
  });

  it('control buttons for host show up', () => {
    const wrapper = shallow(<EventDetailsComponent {...propsHost} />);
    const controlButtons = wrapper.find('.event-details-card__info-area-host-btn');
    expect(controlButtons).toHaveLength(2);
  });

  it('chat window shows up for host user', () => {
    const wrapper = shallow(<EventDetailsComponent {...propsHost} />);
    expect(wrapper.find(ChatWindowComponentRedux).exists()).toEqual(true);
  });

  it('chat window shows up for subscribed users', () => {
    const wrapper = shallow(<EventDetailsComponent {...propsUnsubscribe} />);
    expect(wrapper.find(ChatWindowComponentRedux).exists()).toEqual(true);
  });

  it('chat window is hidden for unsubscribed user', () => {
    const wrapper = shallow(<EventDetailsComponent {...propsSubscribe} />);
    expect(wrapper.find(ChatWindowComponentRedux).exists()).toEqual(false);
  });

  it('chat window is hidden for unathenticated user', () => {
    const wrapper = shallow(<EventDetailsComponent {...unathenticatedProps} />);
    expect(wrapper.find(ChatWindowComponentRedux).exists()).toEqual(false);
  });

  it('chat window displays messages', () => {
    const wrapper = shallow(<ChatWindowComponent {...propsChat} />);
    expect(wrapper.find('.chat-window__item')).toHaveLength(propsChat.messages.length);
  });

  it('visitors section displays visitors', () => {
    const wrapper = shallow(<EventDetailsComponent {...propsRenderVisitors} />);
    expect(wrapper.find('.event-details-visitors').children()).toHaveLength(propsRenderVisitors.event.visitors.length);
  });

  it('chat window textArea gets cleared after submition', () => {
    const message = 'test';
    const wrapper = shallow(<ChatWindowComponent {...propsChat} />);
    wrapper.find('.chat-window__write-message-area').simulate('change', { target: { value: message } });
    expect(wrapper.state('message')).toBe(message);
    wrapper.find('.chat-window__container').simulate('submit', { preventDefault: () => {} });
    expect(wrapper.state('message')).toBe('');
  });
});
