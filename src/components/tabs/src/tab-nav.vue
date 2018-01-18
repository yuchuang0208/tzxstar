<script>
  import TabBar from './tab-bar';
  import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event';

  function noop() {}

  export default {
    name: 'TabNav',

    components: {
      TabBar
    },

    props: {
      panes: Array,
      currentName: String,
      editable: Boolean,
      onTabClick: {
        type: Function,
        default: noop
      },
      onTabRemove: {
        type: Function,
        default: noop
      },
      type: String
    },

    data() {
      return {
        scrollable: false,
        navStyle: {
       
          transform: ''
        }
      };
    },

    methods: {
      scrollPrev() {
        const containerWidth = this.$refs.navScroll.offsetWidth;
        const currentOffset = this.getCurrentScrollOffset();

        if (!currentOffset) return;

        let newOffset = currentOffset > containerWidth
          ? currentOffset - containerWidth
          : 0;

        this.setOffset(newOffset);
      },
      scrollNext() {
        const navWidth = this.$refs.nav.offsetWidth;
        const containerWidth = this.$refs.navScroll.offsetWidth;
        const currentOffset = this.getCurrentScrollOffset();

        if (navWidth - currentOffset <= containerWidth) return;

        let newOffset = navWidth - currentOffset > containerWidth * 2
          ? currentOffset + containerWidth
          : (navWidth - containerWidth);

        this.setOffset(newOffset);
      },
      scrollToActiveTab() {
        if (!this.scrollable) return;
        const nav = this.$refs.nav;
        const activeTab = this.$el.querySelector('.is-active');
        const navScroll = this.$refs.navScroll;
        const activeTabBounding = activeTab.getBoundingClientRect();
        const navScrollBounding = navScroll.getBoundingClientRect();
        const navBounding = nav.getBoundingClientRect();
        const currentOffset = this.getCurrentScrollOffset();
        let newOffset = currentOffset;

        if (activeTabBounding.left < navScrollBounding.left) {
          newOffset = currentOffset - (navScrollBounding.left - activeTabBounding.left);
        }
        if (activeTabBounding.right > navScrollBounding.right) {
          newOffset = currentOffset + activeTabBounding.right - navScrollBounding.right;
        }
        if (navBounding.right < navScrollBounding.right) {
          newOffset = nav.offsetWidth - navScrollBounding.width;
        }
        this.setOffset(Math.max(newOffset, 0));
      },
      getCurrentScrollOffset() {
        const { navStyle } = this;
        return navStyle.transform
          ? Number(navStyle.transform.match(/translateX\(-(\d+(\.\d+)*)px\)/)[1])
          : 0;
      },
      setOffset(value,trans) {
      	
      	if(value==0&&trans==undefined){
      		this.navStyle.transform = `translateX(-14px)`;
      	}
      	else{
      		this.navStyle.transform = `translateX(-${value}px)`;
      	}
        
      },
      update() {
        const navWidth = this.$refs.nav.offsetWidth;
        const containerWidth = this.$refs.navScroll.offsetWidth;
        const currentOffset = this.getCurrentScrollOffset();

        if (containerWidth < navWidth) {
          const currentOffset = this.getCurrentScrollOffset();
          this.scrollable = this.scrollable || {};
          this.scrollable.prev = currentOffset;
          this.scrollable.next = currentOffset + containerWidth < navWidth;
          if (navWidth - currentOffset < containerWidth) {
            this.setOffset(navWidth - containerWidth,this.scrollable);
          }
        } else {
          this.scrollable = false;
          if (currentOffset > 0) {
            this.setOffset(0,this.scrollable);
          }
        }
      }
    },

    updated() {
      this.update();
    },

    render(h) {
      const {
        type,
        panes,
        editable,
        onTabClick,
        onTabRemove,
        navStyle,
        scrollable,
        scrollNext,
        scrollPrev
      } = this;

      const scrollBtn = scrollable
      ? [
        <span class={['el-tabs__nav-prev', scrollable.prev ? '' : 'is-disabled']} on-click={scrollPrev}><i class="el-icon-d-arrow-left"></i></span>,
        <span class={['el-tabs__nav-next', scrollable.next ? '' : 'is-disabled']} on-click={scrollNext}><i class="el-icon-d-arrow-right"></i></span>
      ] : [
        <span class={['el-tabs__nav-prev', scrollable.prev ? '' : 'is-disabled']} on-click={scrollPrev}><i class="el-icon-d-arrow-left"></i></span>,
        <span class={['el-tabs__nav-next', scrollable.next ? '' : 'is-disabled']} on-click={scrollNext}><i class="el-icon-d-arrow-right"></i></span>
      ];

      const tabs = this._l(panes, (pane, index) => {
        let tabName = pane.name || pane.index || index;
        const closable = pane.isClosable || editable;

        pane.index = `${index}`;

        const btnClose = closable
          ? <span  on-click={(ev) => { onTabRemove(pane, ev); }}><i class={{'tzx-close':!pane.active,'el-icon-close':true}}></i></span>
          : null;

        const tabLabelContent = pane.$slots.label || pane.label;
        return (
          <div
            class={{
              'el-tabs__item': true,
              'is-active': pane.active,
              'is-disabled': pane.disabled,
              'is-closable': closable
            }}
            ref="tabs"
            refInFor
            on-click={(ev) => { onTabClick(pane, tabName, ev); }}
          >
            {tabLabelContent}
            {btnClose}
          </div>
        );
      });
      return (
        <div class={['el-tabs__nav-wrap', scrollable ? 'is-scrollable' : '']}>
          {scrollBtn}
          <div class={['el-tabs__nav-scroll']} ref="navScroll">
            <div class="el-tabs__nav" ref="nav" style={navStyle}>
              {!type ? <tab-bar tabs={panes}></tab-bar> : null}
              {tabs}
            </div>
          </div>
        </div>
      );
    },

    mounted() {
      addResizeListener(this.$el, this.update);
    },

    beforeDestroy() {
      if (this.$el && this.update) removeResizeListener(this.$el, this.update);
    }
  };
</script>
<style>
.el-tabs__nav-next, .el-tabs__nav-prev {
	    top:1px;
	    position: absolute; 
	    cursor: pointer;
	    height: 28px;
	    line-height: 24px;
	    font-size: 12px;
	    background: #FFFFFF;
	    color: #96999a;
	    padding: 0px 7px;
	    border: 1px solid #D8E5EC;
	    border-radius: 3px;
	    box-shadow: 0 0 6px 0 rgba(33,41,50,0.05);
}
</style>

