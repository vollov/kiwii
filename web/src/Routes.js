import React from 'react'
import { Switch, Redirect } from 'react-router-dom'

import { RouteWithLayout, PrivateRoute } from './components'
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts'

import {
	ProductList as HomeView,
	ProductDetail as ProductView,
	SignIn as SignInView,
	About as AboutView,
	Cart as CartView,
	Payment as PaymentView,
} from './views'

import { GoogleCallback, FacebookCallback } from 'components'

const Routes = () => {
	return (
		<Switch>
			<Redirect exact from='/' to='/home' />
			<PrivateRoute
				component={AboutView}
				exact
				layout={MainLayout}
				path='/about'
			/>
			<PrivateRoute
				component={AboutView}
				exact
				layout={MainLayout}
				path='/goal/:id'
			/>
			<PrivateRoute
				component={PaymentView}
				exact
				layout={MainLayout}
				path='/payment'
			/>
			<RouteWithLayout
				component={HomeView}
				exact
				layout={MainLayout}
				path='/home'
			/>
			<RouteWithLayout
				component={ProductView}
				exact
				layout={MainLayout}
				path='/product-detail/:sku'
			/>
			<RouteWithLayout
				component={CartView}
				exact
				layout={MainLayout}
				path='/cart'
			/>

			<RouteWithLayout
				component={GoogleCallback}
				exact
				layout={MinimalLayout}
				path='/google/callback'
			/>
			<RouteWithLayout
				component={FacebookCallback}
				exact
				layout={MinimalLayout}
				path='/facebook/callback'
			/>
			<RouteWithLayout
				component={SignInView}
				exact
				layout={MinimalLayout}
				path='/login'
			/>
		</Switch>
	)
}

export default Routes
