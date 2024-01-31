import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, Platform, ScrollView } from 'react-native';
import StarRating from 'react-native-star-rating';
import Spinner from 'react-native-loading-spinner-overlay';
import { useDispatch, useSelector } from 'react-redux';

import _ from 'lodash';

import { createComment, deleteComment, getProductComments } from '../managers/CommentsService';
import { loadProduct, loadProductNutrients, loadProductRatingInfo, rateProduct, updateProductInfo } from '../redux/products/actions';
import { getProductById, getRatingCategories } from '../redux/products/selectors';

import TabItem from '../components/TabItem';
import CommentsList from '../components/CommentsList';
import CommentInput from '../components/CommentInput';
import KeyboardShift from '../components/KeyboardShift';
import NutrientsList from '../components/NutrientsList';
import RatingsList from '../components/RatingsList';
import RateModal from '../components/RateModal';

import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

const COMMENTS_PAGE_SIZE = 10;

const Tab = Object.freeze({
  RATINGS: 'ОЦЕНКИ',
  COMMENTS: 'КОМЕНТАРИ',
  DESCRIPTION: 'ОПИСАНИЕ',
  NUTRIENTS: 'СТОЙНОСТИ',
});

const categories = Object.freeze({
  1: { title: 'МЛЕЧНИ', icon: require('../assets/images/cheese.png') },
  2: { title: 'КОЛБАСИ', icon: require('../assets/images/sausage.png') },
  3: { title: 'ЗАХАРНИ', icon: require('../assets/images/cookie.png') },
});

const ProductInfoScreen = ({ navigation, route }) => {
  const [selectedTab, setSelectedTab] = useState(Tab.RATINGS);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalComments, setTotalComments] = useState(0);
  const [rateModalVisible, setRateModalVisible] = useState(false);
  const [isLikeModalShown, setLikeModalShown] = useState(false);
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);
  const [nutrients, setNutrients] = useState({});
  const [ratingInfo, setRatingInfo] = useState([]);

  const ratingCategories = useSelector((state) => getRatingCategories(state)) || [];

  const product = useSelector((state) => getProductById(state, route.params.productId)) || {};

  const dispatch = useDispatch();

  const scrollViewRef = useRef();

  const categoryId = route.params.categoryId;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ flex: 0.75, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Image source={categories[categoryId].icon} style={{ width: 27, height: 24 }} />
          <Text style={{ color: 'white', fontSize: 24, marginLeft: 5, fontFamily: Fonts.FontFamilyBold }}>
            {categories[categoryId].title}
          </Text>
        </View>
      ),
      headerRight: () => (
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('SignalRequestScreen', { productId: route.params.productId })}
        >
          <Image style={styles.signalIcon} source={require('../assets/images/warning_red.png')} />
        </TouchableWithoutFeedback>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (_.isEmpty(product)) {
      dispatch(loadProduct(route.params.productId));
    }
  }, []);

  useEffect(() => {
    if (!_.isEmpty(product) && isInitialLoaded == false) {
      loadData();
      setIsInitialLoaded(true);
    }
  }, [product]);

  useEffect(() => {
    if (product.ratingInfo) {
      setRatingInfo(product.ratingInfo);
    }
  }, [product.ratingInfo]);

  useEffect(() => {
    if (product.nutrients && _.isEmpty(nutrients)) {
      setNutrients(product.nutrients);
    }
  }, [product.nutrients]);

  const loadData = () => {
    if (_.isEmpty(comments)) {
      fetchComments();
    }

    if (_.isEmpty(nutrients)) {
      dispatch(loadProductNutrients(product));
    }

    if (_.isEmpty(ratingInfo)) {
      dispatch(loadProductRatingInfo(product));
    }
  }

  const fetchComments = async () => {
    const { commentsList, total } = await getProductComments(product.id, 0, COMMENTS_PAGE_SIZE);
    setComments(commentsList);
    setTotalComments(total);
  };

  const loadComments = async () => {
    if (isLoading || comments.length >= totalComments) {
      return;
    }

    console.log(comments.length);
    console.log(totalComments);

    try {
      setIsLoading(true);

      const { commentsList, total } = await getProductComments(product.id, comments.length, COMMENTS_PAGE_SIZE);

      if (commentsList.length > 0) {
        let newComments = comments.concat(commentsList);

        setComments(newComments);
        setTotalComments(total);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      alert('Loading comments failed.');
    }
  };

  const isScrolledToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;

    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  const handleLikeButtonPressed = () => {
    if (product.likedByMe) {
      dispatch(rateProduct(product, true, true))
      return
    }

    setLikeModalShown(true);
    setRateModalVisible(true);
  }

  const handleDislikeButtonPressed = () => {
    if (product.dislikedByMe) {
      console.log('Already disliked.');
      dispatch(rateProduct(product, false, true))
      return
    }

    setLikeModalShown(false);
    setRateModalVisible(true);
  }

  const handleRateProduct = (option, comment) => {
    dispatch(rateProduct(product, isLikeModalShown, true, option, comment));

    setRateModalVisible(false);
  };

  const addNewComment = async (text) => {
    try {
      const newComment = await createComment(product.id, text);

      dispatch(updateProductInfo({ ...product, totalComments: comments.length + 1 }));

      setComments([newComment, ...comments]);
      setTotalComments(totalComments + 1);

      scrollViewRef.current.scrollTo({ x: 0, y: 100, animated: true });
    } catch (error) {
      alert('Creating comment failed.');
    }
  };

  const onDeleteComment = (commentId) => {
    return deleteComment(commentId).then(() => {
      dispatch(updateProductInfo({ ...product, totalComments: comments.length - 1 }));

      setComments(comments.filter((comment) => comment.id !== commentId));
      setTotalComments(totalComments - 1);
    });
  };

  const renderProduct = () => (
    <>
      <View style={styles.imageContainer}>
        <Image style={styles.productImage} label="rate mate product" source={{ uri: product.imageUrl }} />
        <View style={styles.ratingsContainer}>
          <StarRating
            disabled={true}
            emptyStarColor="grey"
            fullStarColor={'grey'}
            // halfStar={'ios-star-half'}
            maxStars={5}
            rating={product.averageRating}
            starSize={22}
          />
          <Text style={styles.productTotalRates}>
            {product.totalRateCount} {product.totalRateCount == 1 ? 'ОЦЕНКA' : 'ОЦЕНКИ'}
          </Text>
        </View>
      </View>
    </>
  );

  const renderRating = () => (
    <View style={styles.rateContainer}>
      <Text style={styles.rateText}>{'ОЦЕНИ'}</Text>
      <View style={styles.greyThumbContainer}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableWithoutFeedback onPress={handleLikeButtonPressed}>
            <Image
              style={[styles.greyThumbToRate, { top: -9 }]}
              source={
                product.likedByMe == true
                  ? require('../assets/images/like_selected.png')
                  : require('../assets/images/like_unselected.png')
              }
            />
          </TouchableWithoutFeedback>
          <Text style={styles.productLikes}>{product.likes}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginLeft: 30 }}>
          <TouchableWithoutFeedback onPress={handleDislikeButtonPressed}>
            <Image
              style={[styles.greyThumbToRate, { top: 9 }]}
              source={
                product.dislikedByMe == true
                  ? require('../assets/images/dislike_selected.png')
                  : require('../assets/images/dislike_unselected.png')
              }
            />
          </TouchableWithoutFeedback>
          <Text style={styles.productLikes}>{product.dislikes}</Text>
        </View>
      </View>
    </View>
  );

  const renderTabs = () => (
    <View style={styles.tabsContainer}>
      <TabItem title={Tab.RATINGS} selected={selectedTab === Tab.RATINGS} onPress={() => setSelectedTab(Tab.RATINGS)} />
      <TabItem title={Tab.COMMENTS} selected={selectedTab === Tab.COMMENTS} onPress={() => setSelectedTab(Tab.COMMENTS)} />
      <TabItem title={Tab.DESCRIPTION} selected={selectedTab === Tab.DESCRIPTION} onPress={() => setSelectedTab(Tab.DESCRIPTION)} />
      <TabItem title={Tab.NUTRIENTS} selected={selectedTab === Tab.NUTRIENTS} onPress={() => setSelectedTab(Tab.NUTRIENTS)} />
    </View>
  );

  // console.log("Reload: ", product);

  return (
    <>
      <ScrollView
        style={{ backgroundColor: Colors.White, marginBottom: selectedTab === Tab.COMMENTS ? 50 : 0 }}
        ref={scrollViewRef}
        onScroll={({ nativeEvent }) => {
          if (isScrolledToBottom(nativeEvent) && selectedTab === Tab.COMMENTS) {
            loadComments();
          }
        }}
        scrollEventThrottle={500}
      >
        <Text style={styles.productTitleText}>{product.name?.toUpperCase()}</Text>
        {renderProduct()}
        {renderRating()}
        {renderTabs()}
        {selectedTab === Tab.RATINGS && <RatingsList ratingInfo={ratingInfo} categoriesList={ratingCategories} />}
        {selectedTab === Tab.COMMENTS && (
          <>
            <Spinner visible={isLoading} />
            <CommentsList comments={comments} onDeleteComment={onDeleteComment} />
          </>
        )}
        {selectedTab === Tab.DESCRIPTION && <Text style={styles.descriptionText}>{product.description}</Text>}
        {selectedTab === Tab.NUTRIENTS && <NutrientsList nutrients={nutrients} />}
      </ScrollView>
      <RateModal
        visible={rateModalVisible}
        options={ratingCategories}
        onClose={() => setRateModalVisible(false)}
        onSubmit={handleRateProduct}
      />
      {selectedTab === Tab.COMMENTS && (
        <View style={{ width: '100%', height: 50, position: 'absolute', bottom: 0 }}>
          <KeyboardShift>{() => <CommentInput createComment={addNewComment} />}</KeyboardShift>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  productTitleText: {
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    fontFamily: Fonts.FontFamily,
    textAlign: 'center',
    padding: 3,
    top: 3,
  },
  imageContainer: {
    borderTopColor: Colors.Grey2,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  productImage: {
    width: 220,
    height: 200,
    marginVertical: 20,
    resizeMode: 'contain',
  },
  ratingsContainer: {
    flexDirection: 'row',
    paddingBottom: 40,
  },
  productTotalRates: {
    marginTop: Platform.OS === 'ios' ? 5 : 2,
    marginLeft: 15,
    fontSize: 18,
    fontFamily: Fonts.FontFamilyBold,
    textAlign: 'left',
    textAlignVertical: 'top',
  },
  rateContainer: {
    paddingTop: 15,
    borderTopColor: Colors.Grey2,
    borderTopWidth: 1,
  },
  rateText: {
    color: Colors.Blue,
    fontSize: 20,
    fontFamily: Fonts.FontFamilyBold,
    textAlign: 'center',
  },
  greyThumbContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  greyThumbToRate: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  productLikes: {
    fontSize: 20,
    fontFamily: Fonts.FontFamilyBold,
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginLeft: -8,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
    borderBottomColor: Colors.Grey2,
    borderBottomWidth: 1,
  },
  signalIcon: {
    width: 30,
    height: 25,
    marginRight: 10,
    tintColor: 'white',
  },
  descriptionText: {
    paddingVertical: 20,
    marginHorizontal: 20,
    fontSize: 14,
    fontFamily: Fonts.FontFamily,
    lineHeight: 20,
  },
});

export default ProductInfoScreen;
