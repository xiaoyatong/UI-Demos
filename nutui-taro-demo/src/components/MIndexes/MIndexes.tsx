import { ScrollView, View } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { PureComponent } from 'react';
import { isEqual } from 'lodash';

import './index.scss';
import { isEmpty } from '../../utils/common';

const topOffset = 40; // 滑动选中高亮的顶部偏移(px)

export interface ListItem { title: string; index: string; children: { title: string;[key: string]: any }[] };
interface IMIndexesProps {
  /**
  * 索引列表的列表数据。每个元素包含三个字元素，index(string)：索引值，例如1，2，3，...或A，B，C等；title(string): 索引标题，可不填将默认设为索引值；children(Array<{title: string}>): 子元素列表，title为子元素的展示文案。
  * @default []
  */
  list: ListItem[];
  /**
   * 点击行元素时触发事件
   */
  onSelect?: (indexes: { groupIndex: string; childrenIndex: number }) => void;
  style?: Record<string, any>;
  /**
   * 当前选中的省份-城市
   */
  selectedRow: {
    group?: any;
    city?: any;
  }
}

interface IMIndexesState {
  clientHeight: any;
  currentGroup: any;
  activeGroup: any;
  groups: any;
  showScrollTip: boolean;
}

class MIndexes extends PureComponent<IMIndexesProps, IMIndexesState> {
  constructor(props) {
    super(props);
    this.state = {
      clientHeight: 0,
      currentGroup: this.props.list[0] || {}, // 当前跳转group
      activeGroup: {}, // 当前高亮group
      groups: this.props.list || [],
      showScrollTip: false,
    }
  }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.getDomInfo().then(() => {
  //       // 根据定位更新当前右侧指示标志位置
  //       const { group } = this.props.selectedRow;
  //       if (!isEmpty(group)) {
  //         this.setState({
  //           activeGroup: group,
  //           currentGroup: group,
  //         })
  //       }
  //     });
  //   }, 100);
  // }

  UNSAFE_componentWillReceiveProps(nextProps: IMIndexesProps) {
    if (isEqual(nextProps.list, this.state.groups)) return;

    this.setState({
      groups: nextProps.list
    }, () => {
      setTimeout(() => {
        this.getDomInfo().then(() => {
          // 根据定位更新当前右侧指示标志位置
          const { group } = this.props.selectedRow;
          if (!isEmpty(group)) {
            this.setState({
              activeGroup: group,
              currentGroup: group,
            })
          }
        });
      }, 200);
    });
  }

  $instance = getCurrentInstance()

  timer;

  groupTop;

  btnBar;

  getDomInfo = async () => {
    return new Promise<void>(resolve => {
      const query = Taro.createSelectorQuery();
      query.select(`#id-m-indexes__bar`).boundingClientRect()
      query.selectAll(`.m-indexes__group`).boundingClientRect();
      query.exec((res) => {
        console.log('%c [ res ]-59', 'font-size:13px; background:pink; color:#bf2c9f;', res)
        if (!res[0]) return;
        this.btnBar = {
          top: res[0].top,
          height: res[0].height,
          itemHeight: res[0].height / this.state.groups.length,
        };
        if (isEmpty(res[1])) return;
        console.log('%c [ res[1] ]-110', 'font-size:13px; background:pink; color:#bf2c9f;', res[1])
        // 计算每个group的scrollTop
        this.groupTop = res[1].map((element) => element.height);
        this.groupTop.reduce((acc, cur, index) => {
          const amount = acc + cur;
          this.groupTop[index] = amount;

          return amount;
        });
        resolve();
      });
    })
  }

  getHeight = () => {
    Taro.getSystemInfo({
      success: (res) => {
        this.setState(
          {
            clientHeight: res.windowHeight,
          },
        );
      },
    });
  }

  lastScrollTime;
  scrollTimer;
  // 控制触发频率(防抖)
  throttleScroll = () => {
    return new Promise<void>((resolve) => {
      const delay = 100;
      const now = Date.now();
      if (this.lastScrollTime && this.lastScrollTime + delay > now) {
        if (this.scrollTimer) {
          clearTimeout(this.scrollTimer);
        }
        this.scrollTimer = setTimeout(() => {
          this.lastScrollTime = now;
          resolve();
        }, delay);
      } else {
        this.lastScrollTime = now;
        resolve();
      }
    });
  }

  onListScroll = (e) => {
    const { scrollTop } = e.detail;
    this.activeIndexWhenScroll(scrollTop);
    // this.throttleScroll().then(() => {
    // });
  }

  // 在scroll-view滑动过程中，高亮对应的index
  activeIndexWhenScroll = (scrollTop: number) => {
    const curIndex = this.computedIndexByScrollTop(scrollTop);
    // console.log('%c [ curIndex ]-122', 'font-size:13px; background:pink; color:#bf2c9f;', curIndex)
    if (curIndex >= 0) {
      this.setState({
        activeGroup: this.state.groups[curIndex],
      });
    }
  }

  // 通过scroll-view滑动高度计算当前下标位置
  computedIndexByScrollTop(scrollTop: number): number {
    if (!this.groupTop) {
      return -1;
    }

    return this.groupTop.findIndex((element) => element - topOffset > scrollTop);
  }

  onTouchStart = () => { }

  onTouchMove = (e) => {
    this.throttleScroll().then(() => this.scrollToY(e.changedTouches[0].pageY));
  }
  onTouchCancel = () => {
    this.switchScrollTip(false);
  }

  onTouchEnd = (e) => {
    this.switchScrollTip(false);
    this.scrollToY(e.changedTouches[0].pageY);
  }

  // 通过点击索引的点击位置，判断点击的索引下标位置。
  computedIndex = (tapY) => {
    const offsetY = tapY - this.btnBar.top;
    let index;
    if (offsetY < 0) {
      index = 0;
    } else if (offsetY > this.btnBar.height) {
      index = this.state.groups.length - 1;
    } else {
      index = Math.floor(offsetY / this.btnBar.itemHeight);
    }
    return index;
  }

  scrollToY = (tapY) => {
    const index = this.computedIndex(tapY);
    this.scrollToAnchor(index);
  }

  switchScrollTip = (val) => {
    console.log('%c [ val ]-195', 'font-size:13px; background:pink; color:#bf2c9f;', val)
    val = !!val;
    const switchFun = (value) => {
      if (this.state.showScrollTip === value) {
        return;
      }
      this.setState({
        showScrollTip: value,
      });
    };
    // 关闭tip有延时，开启无延时
    if (!val) {
      clearInterval(this.timer);
      this.timer = setTimeout(() => {
        switchFun(false);
      }, 300);
    } else {
      switchFun(true);
    }
  }

  scrollToAnchor = (index) => {
    this.switchScrollTip(true);
    const curGroup = this.state.groups[index];
    this.setState({
      activeGroup: curGroup,
      currentGroup: curGroup,
    });
  }

  render() {
    const { currentGroup, groups, activeGroup, showScrollTip } = this.state;
    const { style, selectedRow } = this.props;
    console.log('%c [ this.state ]-203', 'font-size:13px; background:pink; color:#bf2c9f;', this.state, this.props)
    return (
      <View className='m-indexes safeArea__padding' style={style}>
        <ScrollView
          className='m-indexes__content'
          scrollY
          scrollIntoView={`index_${currentGroup.index}`}
          scrollWithAnimation={false}
          onScroll={this.onListScroll}
          style={{ height: '100%' }}
        >
          {
            groups.map((group, gIndex) => {
              return (
                <View className='m-indexes__group' key={gIndex} id={`index_${group.index}`}>
                  <View className='m-indexes__title'>{group.title}</View>
                  <View className='m-indexes__group--content' >
                    {
                      group.children.map((row, rowIdx) => {
                        return (
                          <View className={`m-indexes__row ${(selectedRow.group?.title == group.title && selectedRow.city?.title == row.title) ? 'is-actived' : ''}`} key={rowIdx} onClick={() => {
                            this.setState({
                              activeGroup: group
                            });
                            this.props.onSelect && this.props.onSelect({ groupIndex: gIndex, childrenIndex: rowIdx })
                          }}
                          >
                            {row.title}
                          </View>
                        )
                      })
                    }
                  </View>
                </View>
              )
            })
          }
        </ScrollView>
        <View className='m-indexes__index'>
          <View
            className='m-indexes__bar'
            id='id-m-indexes__bar'
            onTouchStart={this.onTouchStart}
            onTouchMove={this.onTouchMove}
            onTouchCancel={this.onTouchCancel}
            onTouchEnd={this.onTouchEnd}
          >
            {/* {
              groups.map((group, index) => {
                // console.log('%c [ showScrollTip, currentGroup.index, group.index, currentGroup.index == group.index ]-277', 'font-size:13px; background:pink; color:#bf2c9f;', showScrollTip, currentGroup.index, group.index, currentGroup.index == group.index)
                return (
                  <View key={index} className={`m-indexes__btn ${activeGroup.index === group.index ? 'is-actived' : ''}`}>
                    {group.index}
                    {showScrollTip && currentGroup.index == group.index && <View className='m-indexes__tips'>
                      <View className='m-indexes__tips-text'>{currentGroup.index}</View>
                    </View>}
                  </View>
                )
              })
            } */}
          </View>
        </View>
      </View>
    )
  }
}

export default MIndexes;
