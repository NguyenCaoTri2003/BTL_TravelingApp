import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useState, useEffect } from 'react'; 
import Icons from 'react-native-vector-icons/FontAwesome6';
import IconsC from 'react-native-vector-icons/Ionicons';
import IconsF from 'react-native-vector-icons/FontAwesome';

const DataHotel = {
  beach: [
    {
      id: '1',
      img: require('../image/hotel-beach-1.png'),
      title: 'Apartment in Omaha',
      rate: '5.0',
      place: 'Beach',
      price: '20'
    },
    {
      id: '2',
      img: require('../image/hotel-beach-2.png'),
      title: 'Apartment in San Jose',
      rate: '5.0',
      place: 'Beach',
      price: '28'
    },
    {
      id: '3',
      img: require('../image/hotel-beach-3.png'),
      title: 'Apartment in Canada',
      rate: '4.5',
      place: 'Beach',
      price: '15'
    },
  ],
  mountain: [
    {
      id: '1',
      img: require('../image/hotel-mountain-1.png'),
      title: 'Cabin in Alps',
      rate: '4.8',
      place: 'Mountain',
      price: '35'
    },
    {
      id: '2',
      img: require('../image/hotel-mountain-2.png'),
      title: 'Cabin in Rocky Mountains',
      rate: '4.7',
      place: 'Mountain',
      price: '30'
    }
  ],
  camping: [
    {
      id: '1',
      img: require('../image/hotel-camping-1.png'),
      title: 'Campground in Yosemite',
      rate: '4.9',
      place: 'Camping',
      price: '10'
    },
    {
      id: '2',
      img: require('../image/hotel-camping-2.png'),
      title: 'Campground in Grand Canyon',
      rate: '4.8',
      place: 'Camping',
      price: '12'
    }
  ]
};


const Room = ({item}) => {
  return (
    <View style={styles.room}>
          <Image source={item.img} style={styles.imgRoom}/>
          <View style={styles.heart}>
            <Icons name='heart' color='gray' size={30} style={styles.iconHeart} />
          </View>
          <View style={styles.detail1}>
            <Text style={styles.textHotel}>{item.title}</Text>
            <View style={styles.rate}>
              <IconsC name='star' color='#EBC350' size={20} style={styles.iconRate} />
              <Text style={styles.textRace}>{item.rate}</Text>
            </View>
          </View>
          <View style={styles.detail2}>
            <Text style={styles.textPlace}>{item.place}</Text>
            <View style={styles.price}>
              <Icons name='dollar-sign' color='#000' size={20} style={styles.iconPrice} />
              <Text style={styles.textPrice}><Text style={styles.textBold}>{item.price}</Text>/night</Text>
            </View>
          </View>
        </View>
  );
}
const renderItem = ({ item }) => {
  return (
    <Room item={item} />
  );
};

  export default function ScreenHome({navigation}) {
    const [selectedMenu, setSelectedMenu] = useState('beach'); // Đổi thành 'beach' để tương thích với keys trong DataHotel
    const [selectedMainMenu, setSelectedMainMenu] = useState('Search');
    const [searchQuery, setSearchQuery] = useState(''); 
    const [filteredData, setFilteredData] = useState(DataHotel[selectedMenu.toLowerCase()]);

    useEffect(() => {
    // Lọc dữ liệu dựa trên từ khóa tìm kiếm
    const dataToShow = DataHotel[selectedMenu.toLowerCase()];
    setFilteredData(
      dataToShow.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, selectedMenu]);

    // Lấy dữ liệu dựa vào trạng thái selectedMenu
    const dataToShow = DataHotel[selectedMenu.toLowerCase()]; // Chuyển giá trị thành chữ thường để khớp với keys

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.search}>
            <TouchableOpacity>
              <Image source={require('../image/icon-search.png')} style={styles.iconSearch} />
            </TouchableOpacity>
            <TextInput 
              style={styles.inputSearch}
              placeholder="Where do you want to stay?"
              placeholderTextColor="#B4B5B4"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <View style={styles.menu}>
            <TouchableOpacity 
              style={[styles.menuItem, selectedMenu === 'beach' && styles.menuSelect]} 
              onPress={() => setSelectedMenu('beach')}
            >
              <Icons 
                name="umbrella-beach" 
                color={selectedMenu === 'beach' ? '#04BAD6' : '#414B52'} 
                size={30}  
              />
              <Text 
                style={[
                  styles.textMenu, 
                  selectedMenu === 'beach' && styles.textSelect
                ]}
              >
                Beach
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.menuItem, selectedMenu === 'mountain' && styles.menuSelect]} 
              onPress={() => setSelectedMenu('mountain')}
            >
              <Icons 
                name="mountain" 
                color={selectedMenu === 'mountain' ? '#04BAD6' : '#414B52'} 
                size={30}  
              />
              <Text 
                style={[
                  styles.textMenu, 
                  selectedMenu === 'mountain' && styles.textSelect
                ]}
              >
                Mountain
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.menuItem, selectedMenu === 'camping' && styles.menuSelect]} 
              onPress={() => setSelectedMenu('camping')}
            >
              <Icons 
                name="campground" 
                color={selectedMenu === 'camping' ? '#04BAD6' : '#414B52'} 
                size={30}  
              />
              <Text 
                style={[
                  styles.textMenu, 
                  selectedMenu === 'camping' && styles.textSelect
                ]}
              >
                Camping
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.content}>
          {filteredData.length > 0 ? (
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
          />
          ) : (
            <Text style={styles.noDataText}>Không có khách sạn cần tìm</Text>
          )}
        </View>
        <View style={styles.footer}>
          <View style={styles.footer}>
            <TouchableOpacity 
              style={[styles.itemMenuMain, selectedMainMenu === 'Search']} 
              onPress={() => setSelectedMainMenu('Search')}
            >
              <IconsF name='search' color={selectedMainMenu === 'Search' ? '#04BAD6' : '#414B52'} size={30}/>
              <Text style={[styles.textMenuMain, selectedMainMenu === 'Search' && styles.textSelect]}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.itemMenuMain, selectedMainMenu === 'Favorite']} 
              onPress={() => setSelectedMainMenu('Favorite')}
            >
              <IconsF name='heart' color={selectedMainMenu === 'Favorite' ? '#04BAD6' : '#414B52'} size={30}/>
              <Text style={[styles.textMenuMain, selectedMainMenu === 'Favorite' && styles.textSelect]}>Favorite</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.itemMenuMain, selectedMainMenu === 'Bookings']} 
              onPress={() => setSelectedMainMenu('Bookings')}
            >
              <IconsF name= 'suitcase' color={selectedMainMenu === 'Bookings' ? '#04BAD6' : '#414B52'} size={30}/>
              <Text style={[styles.textMenuMain, selectedMainMenu === 'Bookings' && styles.textSelect]}>Bookings</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.itemMenuMain, selectedMainMenu === 'Inbox']} 
              onPress={() => setSelectedMainMenu('Inbox')}
            >
              <IconsF name='wechat' color={selectedMainMenu === 'Inbox' ? '#04BAD6' : '#414B52'} size={30}/>
              <Text style={[styles.textMenuMain, selectedMainMenu === 'Inbox' && styles.textSelect]}>Inbox</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.itemMenuMain, selectedMainMenu === 'Profile']} 
              onPress={() => setSelectedMainMenu('Profile')}
            >
              <IconsF name='user-circle-o' color={selectedMainMenu === 'Profile' ? '#04BAD6' : '#414B52'} size={30}/>
              <Text style={[styles.textMenuMain, selectedMainMenu === 'Profile' && styles.textSelect]}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header:{
    flex: 2,
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    backgroundColor: '#EBFDFF'
  },
  search:{
    borderWidth: 1,
    width: "95%",
    height: 70,
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: '#B4B5B4',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#fff'
  },
  iconSearch:{
    width: 35,
    height: 35,
    marginLeft: 20
  },
  inputSearch:{
    width: "70%",
    height: 70,
    fontSize: 22,
    marginLeft: 10,
  },
  menu:{
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  menuItem:{
    width: '33.3%',
    height: 60,
    alignItems: 'center',
  },
  textMenu:{
    fontSize: 14,
    color: '#414B52'
  },
  menuSelect:{
    borderBottomWidth: 5,
    borderBottomColor: '#04BAD6'
  },
  textSelect:{
    color: '#04BAD6',
  },
  content:{
    flex: 8,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  room:{
    height: '71%',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  imgRoom:{
    width: 420,
    height: 420,
    borderRadius: 10,
  },
  detail1:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textHotel:{
    fontSize: 20,
    fontWeight: 'bold',
  },
  textRace:{
    fontSize: 20,
    color: '#414B52'
  },
  detail2:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rate:{
    flexDirection: 'row',
    width: '12%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  price:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  textPlace:{
    fontSize: 20,
    color: '#97999C'
  },
  textPrice:{
    fontSize: 20,
    color: '#414B52'
  },
  textBold:{
    fontWeight: 'bold',
    color: '#000'
  },
  heart:{
    backgroundColor :'#fff',
    position: 'absolute',
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginRight: 15
  },
  footer:{
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemMenuMain:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  textMenuMain:{
    fontSize: 16
  },
  noDataText: {
  fontSize: 20,
  color: '#414B52',
  textAlign: 'center',
  marginTop: 20,
}

});
