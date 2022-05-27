---
title: Building Convolutional Neural Networks from Scratch #1 - Matrix Calculus
slug: cnn-math
author: [zayan]
date: 2022-05-26
tags: [ml]
---
## Mathematics

**Mathematics** is an area of knowledge, which includes the study of such topics as numbers, formulas and related structures, shapes and spaces in which they are contained, and quantities and their changes. There is no general consensus about its exact scope or epistemological status. However, it is extremely labourious and time-consuming but necessary and is sometimes (albeit very rarely) interesting.

Neural Networks are somewhat interesting. Everyone knows the math behind NNs (the gist of it). It was taught in **CS5131** to a very limited extent and is incredibly matrix-y (in its full form) but not many know the math behind convolutional neural networks. I mean people get that it has something to do with backpropogation or whatever, but how do you find derivative of the convolution function or the derivative of the max pooling function? As you will come to learn, these derivations are incredibly computationally intensive and time-consuming, especially during implementation. But I have done it because I care about AppVenture and I want to help the casual onlooker understand the many trials and tribulations a simple `Conv2D` layer goes through to deliver what we should consider peak perfection. It was a fun but painful exercise and I gained a deeper understanding of the mathematical constructs that embody our world. Anyways, let's start out with a referesher. Warning that Matrix Math lurks ahead, so tread with caution. This is deeper than **CS5131** could have ever hoped to cover, so you will learn some stuff with this excercise.

This article is written with some assumed knowledge of the reader but it is not that bad for most CS students especially since NNs are baby level for the most part. Nonetheless, assumed knowledge is written below.
- Deep Neural Network (How to implement + basic understanding of the math)
- Gradient Descent
- Linear Algebra
- Convolution
- Max Pooling

Let's start by importing our lord, our saviour, our messiah, **Numpy**.

```python
>>> import numpy as np
```

Numpy is introduced in CS4132 (or PC6432 for some reason), but for a quick summary, it is a Linear Algebra library, which means it is VERY useful in this task.


## Gradient Descent Example (Linear System Solution)

Observe the following series of mathematical equations:

$$
4a+2b=22\\
3a+8b=49
$$

Despite the fact that solving these is pretty easy (as we learnt in Year 1), let's try going with a different solution from what is usually portrayed. Let's try using **gradient descent**.

If you remember, Gradient Descent is a method used to solve any sort of equation by taking steps towards the real value by using calculus to predict the direction and size of the step. Essentially if you remember in calculus, the minimum of the graph will have a tangent of slope 0 and hence we can understand the direction of these "steps" to solve the problem. We just need a function where the derivative and function result approach 0 as you get closer to the true solution. This function is known as the objective function.

As you probably know, a linear equation is written as such:

$$
A \mathbf{x}-\mathbf{b}=0
$$

where $A$ is a known square matrix, $\mathbf{b}$ is a known vector and $\mathbf{x}$ is an unknown vector.

In this case, for the objective function we will use Linear Least Squares (LLS) function as it is an accurate thing to minimize in this case written below. 

$$F(\mathbf{x}) = {||A\mathbf{x}-\mathbf{b}||}_{2}^{2}$$

### Matrix Calculus

Now, what do the weird lines and two occurences of "2" above mean and how exactly do we calculate the derivative of a scalar in terms of a vector? Well we have to learn matrix calculus, a very peculiar domain of math that is very torturous. Ideally, you want to avoid this at all cost, but I will do a gentle walk through this stuff.

A thing to understand is that vectors are just a collection of numbers, so an n-sized vector will have n partial derivatives if the function is $f:\mathbb{R}^{n} \rightarrow \mathbb{R}$ (the derivative is known as the gradient). But do we represent these n partial derivatives as a column vector or row vector?

$$\frac{\partial y}{\partial\mathbf{x}} = 
\begin{bmatrix}
\frac{\partial y}{\partial{\mathbf{x}}_{1}}\\
\frac{\partial y}{\partial{\mathbf{x}}_{2}}\\
\cdots\\
\frac{\partial y}{\partial{\mathbf{x}}_{n}}\\
\end{bmatrix}
$$
$$
\frac{\partial y}{\partial\mathbf{x}} = 
\begin{bmatrix}
\frac{\partial y}{\partial{\mathbf{x}}_{1}} & \frac{\partial y}{\partial{\mathbf{x}}_{2}} & \cdots & \frac{\partial y}{\partial{\mathbf{x}}_{n}}
\end{bmatrix}
$$

Well, both actually can work (even if you think of a vector as a column vector), the first version is called the denominator layout and the second one is called the numerator layout. They are both transpositions of each other. For gradient descent the denominator layout is more natural because for standard practice because we think of a vector as a column vector. I also prefer the denominator layout. However, the numerator layout follows the rules of single variable calculus more normally and will be much easier to follow. For example, matrices do not have commutative multiplication so the direction you chain terms matters. We naturally think of chaining terms to the back and this is true for numerator layout but in denominator layout terms are chained to the front. Product rule also is more funny when it comes to denom layout. So moving forward we will stick with the numerator layout and transpose the matrix or vector once the derivative is found. We will also stick to column vectors.

First lets look at the $A\mathbf{x}-\mathbf{b}$ term and we will see why the derivative is so and so with a simple $2 \times 2$ case. $A\mathbf{x}-\mathbf{b}$ is a $f:\mathbb{R}^{n} \rightarrow \mathbb{R}^{n}$ and hence the derivative will be a matrix (known as the Jacobian to many). Lets first, see the general equation and work it out for every value.

$$\mathbf{y} = A\mathbf{x}-\mathbf{b}\\
\begin{bmatrix}
{\mathbf{y}}_{1} \\
{\mathbf{y}}_{2}
\end{bmatrix}
=
\begin{bmatrix}
{a}_{11} & {a}_{12}\\
{a}_{21} & {a}_{22}\\
\end{bmatrix}
\begin{bmatrix}
{\mathbf{x}}_{1} \\
{\mathbf{x}}_{2}
\end{bmatrix}
-
\begin{bmatrix}
{\mathbf{b}}_{1} \\
{\mathbf{b}}_{2}
\end{bmatrix}
=
\begin{bmatrix}
{a}_{11}{\mathbf{x}}_{1} + {a}_{12}{\mathbf{x}}_{2}-{\mathbf{b}}_{1} \\
{a}_{21}{\mathbf{x}}_{1} + {a}_{22}{\mathbf{x}}_{2}-{\mathbf{b}}_{1}
\end{bmatrix}
$$

Now we calculate the Jacobian (remember that it is transposed) by calculating the individual derivative for every value.

$$\frac{\partial \mathbf{y}}{\partial \mathbf{x}} =
\begin{bmatrix}
\frac{\partial {\mathbf{y}}_{1}}{\partial{\mathbf{x}}_{1}} & \frac{\partial {\mathbf{y}}_{1}}{\partial{\mathbf{x}}_{2}}\\
\frac{\partial {\mathbf{y}}_{2}}{\partial{\mathbf{x}}_{1}} & \frac{\partial {\mathbf{y}}_{2}}{\partial{\mathbf{x}}_{2}}\\
\end{bmatrix}\\
\frac{\partial {\mathbf{y}}_{1}}{\partial{\mathbf{x}}_{1}}={a}_{11}\\
\frac{\partial {\mathbf{y}}_{1}}{\partial{\mathbf{x}}_{2}}={a}_{12}\\
\frac{\partial {\mathbf{y}}_{2}}{\partial{\mathbf{x}}_{1}}={a}_{21}\\
\frac{\partial {\mathbf{y}}_{2}}{\partial{\mathbf{x}}_{2}}={a}_{22}\\
\frac{\partial \mathbf{y}}{\partial \mathbf{x}} =
\begin{bmatrix}
{a}_{11} & {a}_{12}\\
{a}_{21} & {a}_{22}\\
\end{bmatrix}
=A
$$

We see that it is kind of the same with single variable, where if we have $f(x)=ax$, then $f'(x)=a$ where a is constant.

Now we look at the lines and "2"s. This is a common function known as the euclidean norm or 2-norm.

$$\|{\mathbf {x}}\|_{2}:={\sqrt {x_{1}^{2}+\cdots +x_{n}^{2}}}$$

We then square it giving rise to the second "2". Now we define and do the same thing we did with $Ax-b$, $\|{\mathbf {y}}\|_{2}^{2}$ is $f:\mathbb{R}^{n} \rightarrow \mathbb{R}$. Hence, the derivative is a row vector.

$$
\begin{align*}
z&=\|{\mathbf {y}}\|_{2}^{2}\\
&={\mathbf {y}}_{1}^{2} + {\mathbf {y}}_{2}^{2}
\end{align*}
$$

Now we calculate the Gradient (remember that it is transposed) by calculating the individual derivative for every value.

$$
\frac{\partial F(\mathbf{x})}{\partial\mathbf{y}} = 
\begin{bmatrix}
\frac{\partial F(\mathbf{x})}{\partial{\mathbf{y}}_{1}} & \frac{\partial F(\mathbf{x})}{\partial{\mathbf{y}}_{2}}
\end{bmatrix} \\
\frac{\partial F(\mathbf{x})}{\partial{\mathbf{y}}_{1}}=2\mathbf{y}_{1} \\
\frac{\partial F(\mathbf{x})}{\partial{\mathbf{y}}_{2}}=2\mathbf{y}_{2} \\
\frac{\partial F(\mathbf{x})}{\partial\mathbf{y}} = 
\begin{bmatrix}
2\mathbf{y}_{1} & 2\mathbf{y}_{2}
\end{bmatrix}
=2\mathbf{y}^{T}
$$

To illustrate the chain rule, I will calculate it individually and put it all together.

$$
\begin{align*}
F(\mathbf{x}) &= {||A\mathbf{x}-\mathbf{b}||}_{2}^{2} \\
&= {({a}_{11}{\mathbf{x}}_{1} + {a}_{12}{\mathbf{x}}_{2}-{\mathbf{b}}_{1})}^{2} +
{({a}_{21}{\mathbf{x}}_{1} + {a}_{22}{\mathbf{x}}_{2}-{\mathbf{b}}_{1})}^{2} \\
\end{align*}
$$

Now we calculate the Final Gradient by calculating the individual derivative for every value.

$$
\frac{\partial F(\mathbf{x})}{\partial\mathbf{x}} = 
\begin{bmatrix}
\frac{\partial F(\mathbf{x})}{\partial{\mathbf{x}}_{1}} & \frac{\partial F(\mathbf{x})}{\partial{\mathbf{x}}_{2}}
\end{bmatrix}\\
\frac{\partial F(\mathbf{x})}{\partial{\mathbf{x}}_{1}}=2{a}_{11}({a}_{11}{\mathbf{x}}_{1} + {a}_{12}{\mathbf{x}}_{2}-{\mathbf{b}}_{1}) + 2{a}_{21}({a}_{21}{\mathbf{x}}_{1} + {a}_{22}{\mathbf{x}}_{2}-{\mathbf{b}}_{1})\\
\frac{\partial F(\mathbf{x})}{\partial{\mathbf{x}}_{2}}=2{a}_{12}({a}_{11}{\mathbf{x}}_{1} + {a}_{12}{\mathbf{x}}_{2}-{\mathbf{b}}_{1}) + 2{a}_{22}({a}_{21}{\mathbf{x}}_{1} + {a}_{22}{\mathbf{x}}_{2}-{\mathbf{b}}_{1})\\
\frac{\partial F(\mathbf{x})}{\partial\mathbf{x}} = 
\begin{bmatrix}
2{a}_{11}({a}_{11}{\mathbf{x}}_{1} + {a}_{12}{\mathbf{x}}_{2}-{\mathbf{b}}_{1}) + 2{a}_{21}({a}_{21}{\mathbf{x}}_{1} + {a}_{22}{\mathbf{x}}_{2}-{\mathbf{b}}_{1}) & 2{a}_{12}({a}_{11}{\mathbf{x}}_{1} + {a}_{12}{\mathbf{x}}_{2}-{\mathbf{b}}_{1}) + 2{a}_{22}({a}_{21}{\mathbf{x}}_{1} + {a}_{22}{\mathbf{x}}_{2}-{\mathbf{b}}_{1})
\end{bmatrix}\\
=2
\begin{bmatrix}
{a}_{11}{\mathbf{x}}_{1} + {a}_{12}{\mathbf{x}}_{2}-{\mathbf{b}}_{1} &
{a}_{21}{\mathbf{x}}_{1} + {a}_{22}{\mathbf{x}}_{2}-{\mathbf{b}}_{1}
\end{bmatrix}
\begin{bmatrix}
{a}_{11} & {a}_{12}\\
{a}_{21} & {a}_{22}\\
\end{bmatrix}
=2{(A\mathbf{x}-\mathbf{b})}^{T}A
$$

As we can see from that last step, its pretty complex an expression, but you can see how neat matrix notation is as compared to writing all that out and you see how matrix calculus works. With numerator layout, its very similar to single-variable but with a few extra steps.

I then transpose the derivative back into the denominator layout written below. The step function is also written below which we will use for the gradient descent.

$$F(\mathbf{x}) = {||A\mathbf{x}-\mathbf{b}||}^{2}\\
\nabla F(\mathbf {x} )=2A^{T}(A\mathbf {x} -\mathbf {b})\\
\mathbf {x}_{n+1}=\mathbf {x}_{n}-\gamma \nabla F(\mathbf {x} _{n})$$

where $\gamma$ is the learning rate, we need a small learning rate as it prevents the function from taking large steps and objective functions tend to overblow the "true" error of a function. 

We can now implement this in code form for a very simple linear system written below:

$$w+3x+2y-z=9\\
5w+2x+y-2z=4\\
x+2y+4z=24\\
w+x-y-3z=-12$$

This can be written as such in matrix form:

$$
\begin{bmatrix}
1 & 3 & 2 & -1\\
5 & 2 & 1 & -2\\
0 & 1 & 2 & 4\\
1 & 1 & -1 & -3
\end{bmatrix}
\begin{bmatrix}
w\\
x\\
y\\
z
\end{bmatrix}
=
\begin{bmatrix}
9\\
4\\
24\\
-12
\end{bmatrix}
$$

### Code Implementation

#### Variables

$$
A=
\begin{bmatrix}
1 & 3 & 2 & -1\\
5 & 2 & 1 & -2\\
0 & 1 & 2 & 4\\
1 & 1 & -1 & -3
\end{bmatrix}
$$

```python
>>> A = np.array([[1,3,2,-1],[5,2,1,-2],[0,1,2,4],[1,1,-1,-3]], dtype=np.float64)
>>> A
array([[ 1.,  3.,  2., -1.],
       [ 5.,  2.,  1., -2.],
       [ 0.,  1.,  2.,  4.],
       [ 1.,  1., -1., -3.]])
```


$$
\mathbf{b}=
\begin{bmatrix}
9\\
4\\
24\\
-12
\end{bmatrix}
$$

```python
>>> b = np.array([[9],[4],[24],[-12]], dtype=np.float64) 
>>> b
array([[  9.],
       [  4.],
       [ 24.],
       [-12.]])
```

$$
\mathbf{x}=
\begin{bmatrix}
w\\
x\\
y\\
z
\end{bmatrix}
$$

```python
>>> x = np.random.rand(4,1)
>>> x
array([[0.09257854],
       [0.16847643],
       [0.39120624],
       [0.78484474]])
```

#### The Objective Function and its Derivative

$$F(\mathbf{x}) = {||A\mathbf{x}-\mathbf{b}||}^{2}$$

```python
>>> def objective_function(x):
        return (np.matmul(A,x) - b) ** 2
```

$$\nabla F(\mathbf {x} )=2A^{T}(A\mathbf {x} -\mathbf {b})$$

```python
>>> def objective_function_derivative(x):
        return 2 * np.matmul(A.T, np.matmul(A,x) - b)
```

In this case, I implemented an arbritary learning rate and arbritary step count. In traditional non-machine learning gradient descent, the learning rate changes per step and is determined via a heuristic such as the Barzilai–Borwein method, however this is not necessary as gradient descent is very robust. I used an arbritary step count for simplicity but you should ideally use some sort of boolean condition to break the loop such as $F(\mathbf{x})<0.01$.

$$\mathbf {x}_{n+1}=\mathbf {x}_{n}-\gamma \nabla F(\mathbf {x} _{n})$$

```python
>>> learning_rate = 0.01
>>> for i in range(5000):
        x -= learning_rate * objective_function_derivative(x)
>>> x
array([[1.],
       [2.],
       [3.],
       [4.]])
```

And to check, we now use a simple matrix multiplication:

```python
>>> np.matmul(A,x)
array([[  9.],
       [  4.],
       [ 24.],
       [-12.]])
```

Voila, we have solved the equation with gradient descent, and the solution is super close. This shows the power of gradient descent.

## Deep Neural Network Layer

To understand the math behind a deep neural network layer, we will first look at the single perceptron case.

<img src="single_perceptron_example.png" width=500/>

$$z=xw+b\\
a=\sigma (z)$$

where $w$ is the weight, $b$ is the bias, $x$ is the input, $\sigma$ is the activation function and $a$ is the output. In this case, it is quite easy to represent. Let us expand it to a layer with 4 input neurons and 4 output neurons.

<img src="multiple_perceptron_example.png" width=500/>


$${w}_{11}{x}_{1} + {w}_{21}{x}_{2} + {w}_{31}{x}_{3} + {w}_{41}{x}_{4} + {b}_{1}={z}_{1}\\
{w}_{12}{x}_{1} + {w}_{22}{x}_{2} + {w}_{32}{x}_{3} + {w}_{42}{x}_{4} + {b}_{2}={z}_{2}\\
{w}_{13}{x}_{1} + {w}_{23}{x}_{2} + {w}_{33}{x}_{3} + {w}_{43}{x}_{4} + {b}_{3}={z}_{3}\\
{w}_{14}{x}_{1} + {w}_{24}{x}_{2} + {w}_{34}{x}_{3} + {w}_{44}{x}_{4} + {b}_{4}={z}_{4}\\
{a}_{1}=\sigma({z}_{1}) 
\; {a}_{2}=\sigma({z}_{2}) 
\; {a}_{3}=\sigma({z}_{3})
\; {a}_{4}=\sigma({z}_{4})$$

As you can see, this is just a linear system much like the one showed in the example and it becomes very simple.

$$\mathbf{z} = W\mathbf{x} + \mathbf{b}\\
\mathbf{a} = \sigma(\mathbf{z})
$$

From our work earlier we know that:

$$\frac{\partial \mathbf{z}}{\partial \mathbf{b}}=I$$


However we have once again hit a speedbump. How do we find the derivative of a vector $\mathbf{z}$ with respect to a matrix $W$? The function is of the form $f:\mathbb{R}^{m \times n} \rightarrow \mathbb{R}^{m}$. Hence, the derivative will be a third order tensor also known as a 3D matrix. (colloquially)

$$\mathbf{z} = W\mathbf{x} + \mathbf{b}\\
\begin{bmatrix}
{\mathbf{z}}_{1} \\
{\mathbf{z}}_{2} \\
{\mathbf{z}}_{3}
\end{bmatrix}
=
\begin{bmatrix}
{w}_{11} & {w}_{12}\\
{w}_{21} & {w}_{22}\\
{w}_{31} & {w}_{32}\\
\end{bmatrix}
\begin{bmatrix}
{\mathbf{x}}_{1} \\
{\mathbf{x}}_{2}
\end{bmatrix}
+
\begin{bmatrix}
{\mathbf{b}}_{1} \\
{\mathbf{b}}_{2} \\
{\mathbf{b}}_{3}
\end{bmatrix}
=
\begin{bmatrix}
{w}_{11}{\mathbf{x}}_{1} + {w}_{12}{\mathbf{x}}_{2} - {\mathbf{b}}_{1}\\
{w}_{21}{\mathbf{x}}_{1} + {w}_{22}{\mathbf{x}}_{2} - {\mathbf{b}}_{1}\\
{w}_{31}{\mathbf{x}}_{1} + {w}_{32}{\mathbf{x}}_{2} - {\mathbf{b}}_{1}\\
\end{bmatrix}
$$


```python
>>> x_t = np.array([1,2])
>>> I = np.array([[1,0],[0,1]])
>>> np.kron(x_t, I)
array([[1, 0, 2, 0],
       [0, 1, 0, 2]])
```

We can see that the derivative values in terms of the weight, bias and input are as follows:

$$\frac{\partial \mathbf{a}}{\partial W} = \frac{\partial \mathbf{z}}{\partial W} 
\frac{\partial \mathbf{a}}{\partial \mathbf{z}} = {\mathbf{x}}^{T} \otimes diag({\sigma}^{'}(W\mathbf{x} + \mathbf{b}))$$
$$\frac{\partial \mathbf{a}}{\partial b} = \frac{\partial \mathbf{z}}{\partial b} 
\frac{\partial \mathbf{a}}{\partial \mathbf{z}}=diag({\sigma}^{'}(W\mathbf{x} + \mathbf{b}))$$

Yes, we now have an expression for a MLP!


So that ends Part 1. In the next part, we'll cover Deep Neural Networks, Convolutional Neural Networks and coding a CNN from Scratch. At least I hope.

<hr>

(Excruciatingly edited by Prannaya)
