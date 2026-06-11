import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@react-native-vector-icons/ionicons';

import DashboardScreen from '../features/dashboard/DashboardScreen';
import LeadsScreen from '../features/leads/LeadsScreen';
import RequirementsScreen from '../features/leadsReq/RequirementsScreen';
import CommunitiesScreen from '../features/communities/CommunitiesScreen';
import ProfileScreen from '../features/profile/ProfileScreen';

// import Icon from '../components/Icon';
import Colors from '../theme/colors';

export type MainTabParamList = {
  Dashboard: undefined;
  Leads: undefined;
  Requirements: undefined;
  Communities: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarStyle: styles.tabBar,

        tabBarLabelStyle: styles.label,
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name="home"
              focused={focused}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Leads"
        component={LeadsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name="leads"
              focused={focused}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Requirements"
        component={RequirementsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name="requirements"
              focused={focused}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Communities"
        component={CommunitiesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name="communities"
              focused={focused}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name="profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

interface TabIconProps {
  name: string;
  focused: boolean;
}

const TabIcon = ({ name, focused }: TabIconProps) => (
  <View
    style={[
      styles.iconWrap,
      focused && styles.iconWrapActive,
    ]}>
    <Ionicons
      name={name}
      size={20}
      color={
        focused
          ? Colors.green
          : Colors.sub
      }
    />
  </View>
);

const styles = StyleSheet.create({
  tabBar: {
    height: 72,
    paddingTop: 8,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.white,
  },

  iconWrap: {
    padding: 4,
    borderRadius: 8,
  },

  iconWrapActive: {
    backgroundColor: Colors.greenLight,
  },

  label: {
    fontSize: 10,
    fontWeight: '500',
  },
});

export default MainTabNavigator;