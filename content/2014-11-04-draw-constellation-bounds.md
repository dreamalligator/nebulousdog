Title: Plot Orion Constellation Bounds
Slug: draw-orion-bounds
Date: 2014-11-04
Modified: 2014-11-14
Tags: orion, constellation, python, descartes, astronomy, space, polygons, geometric
Category: code
Image: orion.png
Author: Tom Spalding

The following code plots the [IAU constellation bounds](http://www.iau.org/public/themes/constellations/) of Orion. You can find the code and similar astronomical notebooks in the [notebook](https://github.com/digitalvapor/asterisms#notebooks) section of the [asterisms](https://github.com/digitalvapor/asterisms) project I recently began.

The below text contains a set of coordinates that defines the boundaries of the constellations in the sky. The format is: `HH MM SS.SSSS| DD.DDDDDDD|XXX`

Where:
* `HH MM SS.SSSS` defines the right ascension hour, minute and second with J2000 coordinates
* `DD.DDDDDDD` defines the declination with J2000 coordinates
* `XXX` is the abbreviation of the constellation name
* `|` is the separator of the fields

Example:
`22 57 51.6729| 35.1682358|AND`

    :::python

    # Orion data found at http://www.iau.org/static/public/constellations/txt/ori.txt
    data = '''
    04 43 24.5665|  0.2375014|ORI
    04 44 08.1669| 15.7364635|ORI
    05 05 09.3423| 15.6755352|ORI
    05 05 10.8669| 16.1754990|ORI
    05 27 11.6910| 16.1101055|ORI
    05 27 10.1358| 15.6101446|ORI
    05 43 10.4751| 15.5619202|ORI
    05 43 01.2137| 12.5621548|ORI
    05 53 01.2887| 12.5318508|ORI
    05 53 18.5201| 18.0314159|ORI
    05 49 18.4757| 18.0435486|ORI
    05 49 34.5105| 22.8764725|ORI
    06 00 34.5690| 22.8430862|ORI
    06 00 30.0373| 21.5098724|ORI
    06 20 29.7906| 21.4491768|ORI
    06 20 16.6981| 17.4495068|ORI
    06 25 46.5402| 17.4328651|ORI
    06 25 29.4633| 11.9332972|ORI
    06 25 23.4397|  9.9334478|ORI
    06 21 23.5275|  9.9455481|ORI
    06 20 54.1633| -0.0537102|ORI
    06 20 42.5141| -4.0534163|ORI
    05 56 12.5693| -3.9790573|ORI
    05 55 51.7897|-10.9785318|ORI
    05 10 52.8075|-10.8432293|ORI
    05 11 13.0549| -3.8437285|ORI
    04 46 13.5261| -3.7708201|ORI
    04 46 24.5553|  0.2289162|ORI
    '''

    ra_list = []
    dec_list = []
    abbrev_list = []

    for line in data.split('\n'):
        if(line.startswith('#')):
           continue
        point_info = line.split('|')
        if(len(point_info) == 3):
            ra_list.append(point_info[0].strip().replace(' ',':'))
            dec_list.append(point_info[1].strip())
            abbrev_list.append(point_info[2].strip())

    all_points = zip(ra_list,dec_list,abbrev_list)

All of the lines are parsed and then the points are zipped together into a list of tuples.

    :::python

    %pylab inline
    def pretty_hours(h, pos=None):
        if h % 1.0 == 0.0:
            return '{:.0g}h'.format(h)
        else:
            return '{:.2g}h'.format(h)

    def pretty_degrees(d, pos=None):
        return u'{}°'.format(d)

    from matplotlib.ticker import FuncFormatter
    hours_formatter = FuncFormatter(pretty_hours)
    degrees_formatter = FuncFormatter(pretty_degrees)

The above snippet pretty-fies the axes for the below scatterplot. [Right ascension](https://en.wikipedia.org/wiki/Right_ascension) is the angular distance measured eastward along the celestial equator from the vernal equinox. We flip the x-axis to see the constellations as we would on earth. If we wanted to see the coordinates on a [celestial sphere](https://en.wikipedia.org/wiki/Celestial_sphere) as we would look at a globe, we would not use `gca().invert_xaxis()`.

    :::python

    import ephem
    new_ras = []
    new_decs = []
    HMS = [60.*60.,60.,1.]
    for point in all_points:
        point_ra = sum(a*b for a,b in zip(HMS,map(float,point[0].split(':'))))/3600.
        point_dec = float(point[1])
        new_ras.append(point_ra)
        new_decs.append(point_dec)
    scatter(new_ras,new_decs)
    gca().invert_xaxis()
    gca().xaxis.set_major_formatter(hours_formatter)
    gca().yaxis.set_major_formatter(degrees_formatter)
    gca().xaxis.grid(True)
    gca().yaxis.grid(True)

![scatter](images/orion_scatter.png 'scatterplot of orion bounds')

This example uses [descartes](https://bitbucket.org/sgillies/descartes/) to use shapely or geojson-like geometric objects as matplotlib paths and patches. `pip install descartes`

    :::python

    from matplotlib import pyplot
    #from matplotlib.patches import Polygon
    from shapely.geometry import LineString
    from descartes import PolygonPatch

    BLUE = '#6699cc'
    GRAY = '#999999'

    def plot_line(ax, ob):
        x, y = ob.xy
        ax.plot(x, y, color=GRAY, linewidth=3, solid_capstyle='round', zorder=1)

    new_all_points = zip(new_ras,new_decs)
    # makes continuous boundary by closing to original point
    new_all_points.append(new_all_points[0])
    line = LineString(new_all_points)
    fig = pyplot.figure(1, figsize=(12, 7), dpi=180)
    ax = fig.add_subplot(121)
    plot_line(ax, line)
    polygon = Polygon(new_all_points, fc=BLUE, ec=BLUE, alpha=0.5, zorder=2)
    ax.add_patch(polygon)
    gca().invert_xaxis()
    gca().xaxis.set_major_formatter(hours_formatter)
    gca().yaxis.set_major_formatter(degrees_formatter)
    gca().xaxis.grid(True)
    gca().yaxis.grid(True)

![descartes](images/orion_descartes_bounds.png 'descartes geometric orion')

    :::python

    from PIL import Image
    fig = pyplot.figure(1, figsize=(12, 7), dpi=180)
    ax = fig.add_subplot(121)
    plot_line(ax, line)
    polygon = Polygon(new_all_points, fc=BLUE, ec=BLUE, alpha=0.5, zorder=2)
    ax.add_patch(polygon)
    gca().invert_xaxis()
    gca().xaxis.set_major_formatter(hours_formatter)
    gca().yaxis.set_major_formatter(degrees_formatter)
    gca().xaxis.grid(True)
    gca().yaxis.grid(True)
    ax.set_title('From Data')
    ax=fig.add_subplot(1,2,2)
    img = Image.open('ORI.gif')
    imgplot=plt.imshow(img)
    ax.set_title('Original')
    ax.axis('off')
    #savefig('orion.png')

The blog post can be found in the form of an IPython notebook at [github.com/digitalvapor/asterisms/blob/master/notebooks/draw-bounds.ipynb](https://github.com/digitalvapor/asterisms/blob/master/notebooks/draw-bounds.ipynb).
