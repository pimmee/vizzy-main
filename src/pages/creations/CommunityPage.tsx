import FeaturedCommunity from './FeaturedCommunity';
// import { HideOnScroll } from 'components/HideOnScroll';
import { Header } from 'components/Navigation/Header';
import SEO from 'components/seo';
// import useCommonStyles from 'views/Discover/Tabs/commonStyles';

const CommunityTab = () => {
  // const commonStyles = useCommonStyles();

  return (
    <div /*className={commonStyles.root}*/>
      <SEO
        title="Music Visualizer Video Creations"
        description="Find, share and create music visualizers for free. Get inspired by the videos other people have made and publish your own unique creation."
      />
      {/* <HideOnScroll> */}
      <Header />
      {/* </HideOnScroll> */}
      <FeaturedCommunity />
      {/* <Footer /> */}
    </div>
  );
};

export default CommunityTab;
