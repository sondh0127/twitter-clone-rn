import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  tabContainer: {
    flex: 0.5,
    width: 400,
    marginTop: 40,
  },
  tabHeader: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginBottom: 40,
  },
  tabContent: {
    flex: 1,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#D5CEE7',
    borderBottomWidth: 1,
  },
  activeTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#39235A',
    borderBottomWidth: 2,
  },
  tabHeaderText: {
    fontSize: 18,
    color: '#808389',
    alignSelf: 'center',
    marginBottom: 15,
  },
  tabHeaderTextActive: {
    fontSize: 18,
    color: '#39235A',
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  koTabContainer: {
    width: 400,
    marginTop: 40,
    maxHeight: 400,
    flex: 1,
  },
});
