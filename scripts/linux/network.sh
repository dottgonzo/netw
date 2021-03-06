#!/bin/bash
net=false
nets=false
quality="unknown"
for (( n=0; n<$(ifconfig -s | awk '{print($1)}' | grep -v Iface | grep -v lo | wc -l); n++ )); do

	nni=$(( $n + 1 ))
	n_label=$(ifconfig -s | awk '{print($1)}' | grep -v Iface | grep -v lo | sed -n $nni''p)

	n_mac=$(ifconfig $n_label 2> /dev/null | grep 'Link' | head -1 | awk '{print($5)}')




	if [[ $(ifconfig $n_label 2> /dev/null | grep -c 'inet') > 0 ]]; then

		n_ip=$(ip a | grep inet | grep $n_label | awk '{print$(2)}' | head -1 |sed 's/\/24//g')

		n_inuse=true



		if [[ $(route -n | grep "0.0.0.0" |grep -c "$n_label" ) > 0 ]]; then
			n_connected=true
			gateway=$(route -n | grep "0.0.0.0" |grep "$n_label"  | head -1 | awk '{print($2)}' )


		else
			n_connected=false
		fi


	else

		n_ip="none"
		n_inuse=false
		n_connected=false
	fi

	if iwconfig $n_label > /dev/null 2>&1 ; then
		net_essid=$(iwgetid | grep $n_label | head -1  | sed -e '/ESSID/!d' -e 's/.*ESSID:"/"/' | sed 's/"//g')

		if [[ $net_essid == '' ]]; then
			net_essid=false

		fi

	else
		net_essid=false
	fi





	if [[ $(iwconfig 2> /dev/null | grep -c $n_label) > 0 ]]; then


		iwlist $n_label scan 2> /dev/null > /tmp/.wifiscan$n_label.tmp


		nettest=0
		for (( iw=1;iw<=$(cat /tmp/.wifiscan$n_label.tmp | grep -c ESSID);iw++ )); do


			iw_essid=$(cat /tmp/.wifiscan$n_label.tmp | grep ESSID | sed "s/^.*ESSID://g" | sed -s 's/"//g' | sed -n $iw''p )

			iw_signal=$(cat /tmp/.wifiscan$n_label.tmp | grep Quality | sed "s/^.*Q/Q/g" | sed -n $iw''p )

			iw_mac=$(cat /tmp/.wifiscan$n_label.tmp | grep Cell | awk '{print($5)}' | sed -n $iw''p)

			netwifi='{"essid":"'$iw_essid'","mac":"'$iw_mac'","signal":"'$iw_signal'"}'

			if [[ $nettest == 0 ]];then
				netscan="$netwifi"
				nettest=1
			else
				netscan="$netscan,$netwifi"
			fi

			if [[ $n_connected == true && $n_inuse == true && $iw_essid == $net_essid ]]; then
				quality=$iw_signal
			fi

		done

		interfaceType='wifi'
		scan="[$netscan]"
	else

if [[ $n_mac ]]; then
		interfaceType='wired'

else
		interfaceType='virtual'

fi
		scan=false

	fi







	network='{"type":"'$interfaceType'","interface":"'$n_label'","mac":"'$n_mac'"'


	if [[ $interfaceType && $interfaceType == "wifi" ]]; then
		if [[ $net_essid != false ]]; then

		network=$network',"essid":"'$net_essid'","scan":'$scan
	else
		network=$network',"scan":'$scan

	fi

	fi
	if [[ $n_inuse == true ]]; then
		network=$network',"ip":"'$n_ip'"'

		if [[ $n_connected == true ]]; then
			network=$network',"gateway":"'$gateway'"'
		fi

	fi

	network=$network'}'

	# if [[ $n_connected == true && $n_inuse == true ]]; then
	#
	#
	#
	# 	if [[ interfaceType && interfaceType == "wifi" ]]; then
	# 		net='{"type":"'$interfaceType'","interface":"'$n_label'","mac":"'$n_mac'","ip":"'$n_ip'","essid":"'$net_essid'","quality":"'$quality'"}'
	#
	# 	else
	# 		net='{"type":"'$interfaceType'","interface":"'$n_label'","mac":"'$n_mac'","ip":"'$n_ip'"}'
	# 	fi
	#
	# 	if [[ !$nets ]]; then
	#
	# 		nets="$net"
	# 	else
	# 		nets="$nets,$net"
	# 	fi
	#
	# fi

	if [[ "$n" == "0" ]]; then
		networks="$network"
	else
		networks="$networks,$network"
	fi


done
# if [[ $nets != false ]]; then
#	echo '{"networks":['$networks'],"routes":['$nets']}'
# else
	echo '['$networks']'

# fi
