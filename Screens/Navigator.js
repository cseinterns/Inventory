import React,{Component} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SearchItems from './SearchItems';
import ReadItem from '../Screens/ReadItem';

const Drawer = createDrawerNavigator();
export default function Navigator() {
return(
    
    <Drawer.Navigator>

<Drawer.Screen name="HOME" component={SearchItems} />
<Drawer.Screen name="Items" component={ReadItem} />

    </Drawer.Navigator>
);
}